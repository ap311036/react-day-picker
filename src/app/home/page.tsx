"use client";

import Lottie from "lottie-react";
import type { LottieRefCurrentProps } from "lottie-react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const source = "/lottie/scene_6_anim_1.b23f17ee.json";
const LOTTIE_PLAY_START = 0;
const LOTTIE_PLAY_END = 1;
const LOTTIE_SCROLL_OFFSET = ["0.13 end", "end 0.8"] as const;

type LottieData = Record<string, unknown>;

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const lottieWrapRef = useRef<HTMLDivElement | null>(null);
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const [animationData, setAnimationData] = useState<LottieData | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const response = await fetch(source);
        if (!response.ok) {
          throw new Error("Failed to load lottie json");
        }

        const data = (await response.json()) as LottieData;
        if (active) {
          setAnimationData(data);
        }
      } catch {
        if (active) {
          setAnimationData(null);
        }
      }
    };

    load();

    return () => {
      active = false;
    };
  }, []);

  const { scrollYProgress } = useScroll({
    container: scrollContainerRef,
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.22,
  });

  const titleY = useTransform(smoothProgress, [0.7, 0.78], [100, 0]);
  const titleOpacity = useTransform(smoothProgress, [0.7, 0.78], [0, 1]);

  const descY = useTransform(smoothProgress, [0.7, 0.9], [100, 0]);
  const descOpacity = useTransform(smoothProgress, [0.7, 0.9], [0, 1]);

  const linkY = useTransform(smoothProgress, [0.74, 1], [100, 0]);
  const linkOpacity = useTransform(smoothProgress, [0.74, 1], [0, 1]);

  const imageX = useTransform(smoothProgress, [0.7, 0.72], [-375, -155]);

  const { scrollYProgress: lottieProgress } = useScroll({
    container: scrollContainerRef,
    target: sectionRef,
    offset: [...LOTTIE_SCROLL_OFFSET],
  });
  const smoothLottieProgress = useSpring(lottieProgress, {
    stiffness: 180,
    damping: 30,
    mass: 0.2,
  });

  useMotionValueEvent(smoothLottieProgress, "change", (latest) => {
    const player = lottieRef.current;
    const totalFrames = player?.getDuration(true);

    if (!player || !totalFrames || totalFrames <= 1) return;

    const progress = Math.max(0, Math.min(1, latest));
    const range = Math.max(LOTTIE_PLAY_END - LOTTIE_PLAY_START, 0.0001);
    const normalized = Math.max(0, Math.min(1, (progress - LOTTIE_PLAY_START) / range));
    const frame = normalized * (totalFrames - 1);
    player.goToAndStop(frame, true);
  });

  return (
    <div
      id="sym:Home"
      ref={scrollContainerRef}
      className="relative h-screen overflow-y-auto text-[#1f2328]"
    >
      <div className="min-h-[200vh] bg-amber-50"></div>
      <main className="relative mx-auto max-w-275 px-5 pb-24 pt-10">
        <section ref={sectionRef} className="relative min-h-[400vh]">
          <div className="sticky top-0 flex min-h-screen items-center">
            <div className="grid w-full items-center gap-6 lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)]">
              <div className="max-w-130 z-1">
                <motion.h3
                  style={{ y: titleY, opacity: titleOpacity }}
                  className="text-[44px] leading-[1.2] font-extrabold text-[#1f2328]"
                >
                  <span className="mr-2 inline-block text-[#00b86b]">夢想帳戶</span>
                  一起成就你的夢想
                </motion.h3>
                <motion.p
                  style={{ y: descY, opacity: descOpacity }}
                  className="mt-3 text-[15px] leading-[1.7] text-[#6b6b6b]"
                >
                  設定你的夢想與目標，獲得更高的利率加碼。
                </motion.p>
                <motion.a
                  href="/products/detail/01010050001"
                  style={{ y: linkY, opacity: linkOpacity }}
                  className="mt-5 inline-flex h-10 items-center rounded-xl border border-[#00b86b] bg-white px-5 text-[14px] font-semibold text-[#00b86b] transition hover:bg-[#00b86b] hover:text-white"
                >
                  了解更多
                </motion.a>
              </div>

              <motion.div
                id="sym:lottieRef"
                ref={lottieWrapRef}
                style={{ x: imageX }}
                className="relative flex w-200 aspect-17/18 items-center justify-center"
              >
                {animationData ? (
                  <Lottie
                    lottieRef={lottieRef}
                    animationData={animationData}
                    autoplay={false}
                    loop={false}
                    // rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
                    // className="w-200 aspect-17/18"
                  />
                ) : (
                  <div className="h-115 w-full" />
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
