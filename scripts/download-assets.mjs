import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const assetMap = {
  "https://cdn.prod.website-files.com/69667ce58bb476e5bb50ce27/696a12ba40ac83459dd62c1d_power1.svg":
    "public/assets/brand/power1.svg",
  "https://cdn.prod.website-files.com/69667ce58bb476e5bb50ce27/69667ce58bb476e5bb50d04e_111a.gif":
    "public/assets/brand/avatar.gif",
  "https://cdn.prod.website-files.com/69667ce58bb476e5bb50ce27/69667ce58bb476e5bb50ce59_dribbble.svg":
    "public/assets/social/dribbble.svg",
  "https://cdn.prod.website-files.com/69667ce58bb476e5bb50ce27/69667ce58bb476e5bb50ce4f_behance.svg":
    "public/assets/social/behance.svg",
  "https://cdn.prod.website-files.com/69667ce58bb476e5bb50ce27/69667ce58bb476e5bb50ce5b_instagram.svg":
    "public/assets/social/instagram.svg",
  "https://cdn.prod.website-files.com/69667ce58bb476e5bb50ce27/69667ce58bb476e5bb50ce43_linkedin.svg":
    "public/assets/social/linkedin.svg",
  "https://cdn.prod.website-files.com/69667ce58bb476e5bb50ce27/69667ce58bb476e5bb50cfc0_hand.webp":
    "public/assets/home/hero-hand.webp",
  "https://cdn.prod.website-files.com/69667ce58bb476e5bb50ce27/69667ce58bb476e5bb50cfdc_typing.svg":
    "public/assets/home/typing-card.svg",
  "https://cdn.prod.website-files.com/69667ce58bb476e5bb50ce27/69667ce58bb476e5bb50cf8b_illustration_hover.gif":
    "public/assets/home/illustration-hover.gif",
  "https://cdn.prod.website-files.com/69667ce58bb476e5bb50ce27/69667ce58bb476e5bb50cf8d_heart_hover.gif":
    "public/assets/home/heart-hover.gif",
  "https://cdn.prod.website-files.com/69667ce58bb476e5bb50ce27/69667ce58bb476e5bb50d04c_about%20illustraiton%202.webp":
    "public/assets/about/about-hero.webp",
  "https://cdn.prod.website-files.com/69667ce58bb476e5bb50ce27/69667ce58bb476e5bb50d015_typing_about.webp":
    "public/assets/about/about-typing.webp",
  "https://cdn.prod.website-files.com/614da132432d20db1f702549/637c9cf9611eae6ac1955d02_Dan.jpg":
    "public/assets/about/testimonial-avatar.jpg",
  "https://cdn.prod.website-files.com/69667ce58bb476e5bb50ce27/69667ce58bb476e5bb50cf82_thumbs.webp":
    "public/assets/contact/thumbs.webp",
  "https://cdn.prod.website-files.com/69667ce58bb476e5bb50ce27/69667ce58bb476e5bb50d05b_imgi_81_91c1ea130687931.Y3JvcCwxNTAwLDExNzMsMCwzNw.png":
    "public/assets/illustrations/series-01.png",
  "https://cdn.prod.website-files.com/69667ce58bb476e5bb50ce27/69667ce58bb476e5bb50d001_imgi_87_e5267e131757645.Y3JvcCwxMjc4LDEwMDAsODAwLDA.png":
    "public/assets/illustrations/series-02.png",
  "https://cdn.prod.website-files.com/69667ce58bb476e5bb50ce27/69667ce58bb476e5bb50d00c_typing.webp":
    "public/assets/illustrations/series-03.webp",
  "https://cdn.prod.website-files.com/69667ce58bb476e5bb50ce27/69667ce58bb476e5bb50d013_imgi_102_2bb8b825110523.Y3JvcCw4MDgsNjMyLDAsMA.png":
    "public/assets/illustrations/series-04.png",
  "https://cdn.prod.website-files.com/69667ce58bb476e5bb50ce27/69667ce58bb476e5bb50d05f_imgi_95_cfa632137969789.Y3JvcCwyNDQ3LDE5MTMsNjAsMA%20(2).png":
    "public/assets/illustrations/series-05.png",
  "https://cdn.prod.website-files.com/69667ce58bb476e5bb50ce27/69667ce58bb476e5bb50d057_door.webp":
    "public/assets/illustrations/series-06.webp",
  "https://cdn.prod.website-files.com/69667ce58bb476e5bb50ce27/css/alpower.webflow.shared.c4f0c5438.css":
    "public/assets/original/webflow-shared.css",
};

async function download(url, outPath) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed ${response.status} for ${url}`);
  }

  const bytes = new Uint8Array(await response.arrayBuffer());
  await mkdir(path.dirname(outPath), { recursive: true });
  await writeFile(outPath, bytes);
}

for (const [url, outPath] of Object.entries(assetMap)) {
  await download(url, outPath);
  console.log(`saved ${outPath}`);
}
