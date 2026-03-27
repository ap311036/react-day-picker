"use client";

import Lottie from "lottie-react";
import { useEffect, useState } from "react";

type LottieData = Record<string, unknown>;

const LINEBANK_LOTTIE_URLS = [
  "/lottie/scene_1_anim_1.efbb42d2.json",
  "/lottie/scene_3_anim_1.8d61a21d.json",
  "/lottie/scene_3_anim_2.f2cef187.json",
  "/lottie/scene_4_anim_1.f4af04d2.json",
  "/lottie/scene_5_anim_1.d22b62d6.json",
  "/lottie/scene_6_anim_1.b23f17ee.json",
  "/lottie/scene_7_anim_1.09ae621f.json",
  "/lottie/scene_7_anim_2.39a6f444.json",
] as const;

const serviceCards = [
  {
    className: "icon-service1",
    title: "簡單快速",
    description: "介面操作簡潔便利，系統穩定且快速，捨棄多餘的流程，打造最友善的金融服務。",
  },
  {
    className: "icon-service2",
    title: "隨時隨地",
    description: "以顧客體驗為核心的行動銀行，讓你隨時隨地都能享有 LINE Bank 的服務!",
  },
  {
    className: "icon-service3",
    title: "資產安全",
    description:
      "遵循嚴謹的資訊安全標準，採用先進的安全設備與機制，24 小時全天保護您的資產與隱私的安全。",
  },
] as const;

export default function Home() {
  const [animations, setAnimations] = useState<LottieData[]>([]);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const results = await Promise.all(
          LINEBANK_LOTTIE_URLS.map(async (url) => {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error(`Failed to load lottie: ${url}`);
            }
            return (await response.json()) as LottieData;
          }),
        );

        if (active) {
          setAnimations(results);
        }
      } catch {
        if (active) {
          setAnimations([]);
        }
      }
    };

    load();
    return () => {
      active = false;
    };
  }, []);

  const heroAnimation = animations[0];
  const section31Animation = animations[1];
  const section32Animation = animations[2];
  const section4Animation = animations[3];
  const section5Animation = animations[4];
  const section6Animation = animations[5];
  const section71Animation = animations[6];
  const section72Animation = animations[7];

  return (
    <div id="sym:Home" className="line-home">
      <main className="main-wrap">
        <section className="section section1 active">
          <div className="inner">
            <div className="main-txt-area">
              <h2 className="tit">Banking in Your Hand</h2>
              <p>我要的當下，快點給。有連線的地方，就有銀行。</p>
              <a
                className="btn-app-link"
                href="https://linebank.page.link/app"
                target="_blank"
                rel="noreferrer"
              >
                App Download
              </a>
            </div>
            <div className="img-area-main">
              {heroAnimation ? (
                <Lottie animationData={heroAnimation} className="line-lottie" loop autoplay />
              ) : (
                <div className="line-lottie-fallback" />
              )}
            </div>
          </div>
        </section>

        <section className="section section2 active active-list">
          <div className="inner">
            <div className="main-txt-area">
              <h3 className="tit">服務特色</h3>
              <p>摒棄傳統繁瑣的流程，創造優雅又簡單的金融服務體驗。</p>
            </div>
            <ul className="main-service-list">
              {serviceCards.map((card) => (
                <li key={card.title} className={card.className}>
                  <div className="service-text-box">
                    <h4 className="tit-s">{card.title}</h4>
                    <p>{card.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section section31 active">
          <div className="inner">
            <div className="img-area-section31">
              {section31Animation ? (
                <Lottie animationData={section31Animation} className="line-lottie" loop autoplay />
              ) : (
                <div className="line-lottie-fallback" />
              )}
            </div>
          </div>
        </section>

        <section className="section section32 active">
          <div className="inner section-grid">
            <div className="main-txt-area">
              <h3 className="tit">
                <span>開立主帳戶</span>透過手機立即開戶
              </h3>
              <p>開始使用 LINE Bank 帳戶，享有多元優惠，體驗優質服務。</p>
              <a className="link-action" href="/products/detail/01010010001">
                了解更多
              </a>
            </div>
            <div className="img-area-section32">
              {section32Animation ? (
                <Lottie animationData={section32Animation} className="line-lottie" loop autoplay />
              ) : (
                <div className="line-lottie-fallback" />
              )}
            </div>
          </div>
        </section>

        <section className="section section4 active">
          <div className="inner section-grid reverse">
            <div className="img-area-section4">
              {section4Animation ? (
                <Lottie animationData={section4Animation} className="line-lottie" loop autoplay />
              ) : (
                <div className="line-lottie-fallback" />
              )}
            </div>
            <div className="main-txt-area">
              <h3 className="tit">
                <span>簽帳金融卡</span>最有感的即時回饋
              </h3>
              <p>現金、LINE POINTS…等多元回饋類型任選，刷卡立即享！</p>
              <a className="link-action" href="/products/detail/01">
                了解更多
              </a>
            </div>
          </div>
        </section>

        <section className="section section5 active">
          <div className="inner">
            <div className="main-txt-area">
              <h3 className="tit">
                <span>轉帳</span>簡單便利 一指搞定
              </h3>
              <p>LINE Bank讓你輕鬆轉，便利收；行動銀行跨行轉帳免手續費，每月享優惠轉帳次數。</p>
              <a className="link-action" href="/products/detail/02">
                了解更多
              </a>
            </div>
          </div>
          <div className="img-area-section5">
            {section5Animation ? (
              <Lottie animationData={section5Animation} className="line-lottie" loop autoplay />
            ) : (
              <div className="line-lottie-fallback" />
            )}
          </div>
        </section>

        <section className="section section6 active">
          <div className="inner">
            <div className="section6-wrap ie-sticky">
              <div className="overflow-wrap">
                <div className="main-txt-area">
                  <h3 className="tit">
                    <span>夢想帳戶</span>一起成就你的夢想
                  </h3>
                  <p>設定你的夢想與目標，獲得更高的利率加碼。</p>
                  <a className="link-action" href="/products/detail/01010050001">
                    了解更多
                  </a>
                </div>
                <div className="img-area-section6">
                  {section6Animation ? (
                    <Lottie
                      animationData={section6Animation}
                      className="line-lottie"
                      loop
                      autoplay
                    />
                  ) : (
                    <div className="line-lottie-fallback" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section section71 active">
          <div className="inner">
            <div className="img-area-section71">
              {section71Animation ? (
                <Lottie animationData={section71Animation} className="line-lottie" loop autoplay />
              ) : (
                <div className="line-lottie-fallback" />
              )}
            </div>
          </div>
        </section>

        <section className="section section72 active">
          <div className="inner section-grid reverse">
            <div className="img-area-section72">
              {section72Animation ? (
                <Lottie animationData={section72Animation} className="line-lottie" loop autoplay />
              ) : (
                <div className="line-lottie-fallback" />
              )}
            </div>
            <div className="main-txt-area">
              <h3 className="tit">
                <span>分期信貸（含轉貸）</span>轉貸/新貸 一次到位
              </h3>
              <p>低開辦費、低利率、綁約期短，業界超低。</p>
              <a className="link-action" href="/products/detail/02010010035">
                了解更多
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
