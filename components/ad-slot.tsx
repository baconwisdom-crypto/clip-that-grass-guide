"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { adsterraUnits } from "@/config/adsterra";
import type { AdPlacement } from "@/lib/types";

type UnitName = keyof typeof adsterraUnits;
type AdSlotProps = { placement: AdPlacement; format: "top-sticky" | "vertical-rail" | "responsive-banner" | "sidebar-square"; className?: string };

function NativeAd() {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const target = host.current;
    if (!target || target.querySelector("script")) return;
    const container = document.createElement("div");
    container.id = `container-${adsterraUnits.native.key}`;
    const script = document.createElement("script");
    script.async = true;
    script.dataset.cfasync = "false";
    script.src = adsterraUnits.native.src;
    target.append(container, script);
  }, []);
  return <div ref={host} className="ad-native-content" />;
}

function BannerAd({ name }: { name: Exclude<UnitName, "native"> }) {
  const unit = adsterraUnits[name];
  // Each provider tag gets its own document so atOptions and document.write cannot collide.
  const srcDoc = `<!doctype html><html><head><meta name="referrer" content="strict-origin-when-cross-origin"><style>html,body{margin:0;padding:0;overflow:hidden}</style></head><body><script>var atOptions=${JSON.stringify({ key: unit.key, format: "iframe", height: unit.height, width: unit.width, params: {} })};<\/script><script src="${unit.src}"><\/script></body></html>`;
  return <iframe title={`Advertisement ${name}`} data-ad-unit={name} width={unit.width} height={unit.height} srcDoc={srcDoc} sandbox="allow-scripts allow-same-origin allow-popups" scrolling="no" style={{ border: 0, display: "block" }} />;
}

export function AdSlot({ placement, format, className }: AdSlotProps) {
  const marker = useRef<HTMLSpanElement>(null);
  const [unit, setUnit] = useState<UnitName | null>(null);
  const enabled = siteConfig.ads.enabled && siteConfig.ads.placements?.[placement];
  useEffect(() => {
    if (!enabled || !marker.current?.parentElement) return;
    const parent = marker.current.parentElement;
    const update = () => {
      const width = parent.clientWidth;
      let next: UnitName | null = null;
      if (placement === "left-sticky" && format === "vertical-rail" && window.matchMedia("(min-width: 1280px) and (min-height: 700px)").matches) next = "160x600";
      if (placement === "article-banner" && width >= 280) next = "native";
      if (placement === "sidebar-square" && width >= 300) next = "300x250";
      if (placement === "home-banner") {
        if (width >= 728) next = "728x90";
        else if (window.innerWidth < 800 && document.documentElement.clientWidth >= 320) next = "320x50";
      }
      setUnit(next);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(parent);
    window.addEventListener("resize", update);
    return () => { observer.disconnect(); window.removeEventListener("resize", update); };
  }, [enabled, placement, format]);
  if (!enabled) return null;
  return <><span ref={marker} hidden />{unit && <aside className={["ad-slot", `ad-slot--${format}`, `ad-live--${unit}`, className].filter(Boolean).join(" ")} aria-label="Advertisement" data-ad-placement={placement} data-ad-state="enabled" data-ad-provider="Adsterra" data-ad-unit={unit}>
    <span className="ad-slot__label">Advertisement</span>
    {unit === "native" ? <NativeAd /> : <BannerAd name={unit} />}
  </aside>}</>;
}

export function InlineSquareAd() {
  return <AdSlot placement="sidebar-square" format="sidebar-square" />;
}
