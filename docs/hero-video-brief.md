# Hero: Pixel animation brief

## What's live now
`components/sections/PixelStage.tsx` runs a 5-step loop of about 18 seconds. Pixel stands on the left, and a card plays out on the right for each step:

| # | Pixel says | Card |
|---|---|---|
| 1 | Reading your website… | URL being scanned, logo found, brand colors and services pop in, then fly to Pixel |
| 2 | Grabbing your job photos… | 6 job-site photos with check marks, then fly to Pixel |
| 3 | Pulling your Google reviews… | 4.9 ★ rating and two review snippets, then fly to Pixel |
| 4 | Designing your posts… | 3 finished posts fan out |
| 5 | Scheduling everywhere… | Facebook, Instagram, LinkedIn and Google Business Profile, each with a time and a check mark, then "30 posts scheduled" |

Pixel is currently a still cut-out (`public/media/pixel/pixel-front.webp`) that hops and bobs with CSS.
The cards are HTML, so they stay sharp at any size, are cheap to load, and can be edited in `content/home.ts`.
The animation pauses with a button, and visitors who ask their device for less motion see the finished result (step 5) without any animation.

## Upgrade: animated Pixel clips
To make Pixel actually walk and reach like the cloud in the reference, only the **character** needs to be video. The cards stay as HTML.

### Clips to produce (character only, no background)
| Clip | Length | Action | Loops? |
|---|---|---|---|
| `pixel-walk` | 1–1.5s | walk cycle in place, 3/4 view facing right | yes |
| `pixel-idle` | 2–3s | gentle breathing bob, blinks, antennae wobble | yes |
| `pixel-grab` | ~1.5s | reaches up and to the right, pulls something toward his chest | no |
| `pixel-cheer` | ~1.5s | thumbs-up or both arms up, happy | no |

### Production notes
- **Reference images:** `brand/pixel/pixel-character-sheet.webp` (front and 3/4 views) and `brand/pixel/pixel-waving-storefront.jpg`.
  Use them as image references so every clip shows the same Pixel: olive-green fuzzy felt body, yellow felt face screen,
  big glossy black eyes with white highlights, a small smile, two black antennae with green tips, yellow-and-green ear discs,
  and black segmented joints.
- **Tool:** any image-to-video model that accepts a reference image (Runway, Kling, Veo, Sora, Luma…). Generate 2–4 takes per clip and keep the most consistent one.
- **Background:** render on a flat **magenta (#FF00FF)** background. Not green, because Pixel is green. Then key it out to transparency.
- **Camera:** locked-off, eye level, full body in frame with headroom, soft studio light from the upper left, and the same framing in every clip.
- **Export:**
  - `pixel-<clip>.webm`: VP9 with alpha, for Chrome, Edge, Firefox and Android
  - `pixel-<clip>.mov`: HEVC with alpha, for Safari and iPhone
  - Size: 720px tall, 30fps, under ~1.5MB each

### Example prompt (walk clip)
> The plush robot character from the reference image walks in place, turned three-quarters to the right. Soft felt
> texture, gentle bounce in each step, antennae wobble slightly. Locked camera, full body, flat magenta background,
> soft studio lighting. Seamless loop, 1.5 seconds.

### Wiring it in
Put the files in `public/media/pixel/` and set `hero.pixel.video` in `content/home.ts`.
The stage plays the video in place of the still. Per-step clips (walk → grab → cheer) are a small follow-up change in `PixelStage.tsx`.
