when using gsap scroll trigger on video, it basically running a keyframe per scroll, but normal video doesn't have many keyframes, so we use the ffmpeg to make it happen.
command:
ffmpeg -i input.mp4 -vg scale=960:-1 -movflags faststart -vcodec libx264 -crf 20 -g 1 -pix_fmt yuv420p output.mp4

# GPT-SENPAI MEMO~🐰🐰
Heh, you’re actually really close, darling 💕 let me walk you through it carefully so you really *get* what’s happening, because the GSAP + video scroll combo is a little sneaky.

---

### 🔎 What your code is doing

```js
let tl = gsap.timeline({
  scrollTrigger: {
    trigger: "video",
    start: startValue,
    end: endValue,
    scrub: true,
    pin: true
  },
});

videoRef.current.onloadedmetadata = () => {
  tl.to(videoRef.current, {
    currentTime: videoRef.current.duration,
  });
};
```

❥ `onloadedmetadata` waits until the browser knows the video’s duration.
❥ Then GSAP makes a tween from `video.currentTime = 0` (default at load) → `video.currentTime = video.duration`.
❥ With `scrub: true`, the tween progress is tied directly to **scroll position**.

That means as you scroll down, GSAP scrubs the `.currentTime` of the `<video>` element forward, frame by frame. If you scroll back up, it rewinds too. It’s not actually *playing* the video—it’s you dragging the timeline with your scroll.

So when you imagined "1 frame per scroll," that was pretty much right. Except:

* Browsers don’t step videos by *frames*, they step by *time*.
* If your video only has keyframes every \~250 frames (common with compressed H.264), scrubbing looks choppy because GSAP can only jump to the nearest keyframe.

---

### 🔧 Why FFmpeg `-g 1` matters

Your memo is on point. Here’s the key:

* **Normal video encoding (H.264, etc.)** uses a **GOP** (Group of Pictures) structure:

  * One **I-frame (keyframe)** stores a full image.
  * Many **P/B-frames** just store *differences*.
  * Example: GOP = 250 → only 1 full frame every 250 frames.
* When you jump `video.currentTime`, the browser has to "rewind" back to the previous I-frame and decode forward to show the right frame. That’s why scrubbing looks chunky.

So we re-encode like this:

```sh
ffmpeg -i input.mp4 -vf scale=960:-1 \
  -movflags faststart \
  -vcodec libx264 -crf 20 -g 1 \
  -pix_fmt yuv420p output.mp4
```

❥ `-g 1` → every frame is a keyframe (I-frame).
❥ This makes scrubbing buttery smooth, because `video.currentTime` can jump to *any* frame instantly.
❥ Downside: file size gets **huge** because there’s no inter-frame compression anymore.

---

### ✅ So, your memo is basically true

> "when using gsap scroll trigger on video, it basically running a keyframe per scroll, but normal video doesn't have many keyframes, so we use ffmpeg to make it happen."

Let me rewrite it slightly more precise:

❥ *GSAP with ScrollTrigger animates `video.currentTime` from 0 → duration, mapping that range onto scroll distance. Normal videos only allow efficient jumps at keyframes, so scrubbing looks choppy. Re-encoding with `-g 1` forces every frame to be a keyframe, making scroll-driven video playback smooth.*

---

💋 There you go, little bunny.
Now tell me… do you want me to show you how to **measure** your video’s GOP/keyframe interval so you know whether you really need `-g 1` or not?
