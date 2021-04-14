<template>
  <div id="cardApp">
    <Nuxt />
  </div>
</template>

<script>
export default {};
</script>


<style>
#cardApp {
  padding: 20px;
  box-sizing: border-box;
  background: #f00;
}
@font-face {
  font-family: "Noto Sans CJK KR Bold";
  font-family: "NotoSansKR-Bold";
  src: url("../assets/font/NotoSansKR-Bold.otf");
}
@font-face {
  font-family: "Noto Sans CJK KR Light";
  font-family: "NotoSansKR-Light";
  src: url("../assets/font/NotoSansKR-Light.otf");
}

@font-face {
  font-family: "Noto Sans CJK KR Medium";
  font-family: "NotoSansKR-Medium";
  src: url("../assets/font/NotoSansKR-Medium.otf");
}

@font-face {
  font-family: "Noto Sans CJK KR Regular";
  font-family: "NotoSansKR-Regular";
  src: url("../assets/font/NotoSansKR-Regular.otf");
  font-style: normal;
  font-weight: normal;
  unicode-range: U+0-10FFFF;
}

@font-face {
  font-family: "Nanum-Barun-Gothic-UltraLight";
  font-style: normal;
  font-weight: 200;
  src: url(../assets/font/nanum/NanumBarunGothicUltraLight.eot);
  src: local("Nanum Barun Gothic UltraLight"),
    local("NanumBarunGothicUltraLight"),
    url(../assets/font/nanum/NanumBarunGothicUltraLight.eot?#iefix)
      format("embedded-opentype"),
    url(../assets/font/nanum/NanumBarunGothicUltraLight.woff2) format("woff2"),
    url(../assets/font/nanum/NanumBarunGothicUltraLight.woff) format("woff"),
    url(../assets/font/nanum/NanumBarunGothicUltraLight.ttf) format("truetype");
}
@font-face {
  font-family: "Nanum-Barun-Gothic-Light";
  font-style: normal;
  font-weight: 300;
  src: url(../assets/font/nanum/NanumBarunGothicLight.eot);
  src: local("Nanum Barun Gothic Light"), local("NanumBarunGothicLight"),
    url(../assets/font/nanum/NanumBarunGothicLight.eot?#iefix)
      format("embedded-opentype"),
    url(../assets/font/nanum/NanumBarunGothicLight.woff2) format("woff2"),
    url(../assets/font/nanum/NanumBarunGothicLight.woff) format("woff"),
    url(../assets/font/nanum/NanumBarunGothicLight.ttf) format("truetype");
}

@font-face {
  font-family: "Nanum-Barun-Gothic-normal";
  font-style: normal;
  font-weight: 400;
  src: url(../assets/font/nanum/NanumBarunGothic.eot);
  src: local("Nanum Barun Gothic"), local("NanumBarunGothic"),
    url(../assets/font/nanum/NanumBarunGothic.eot?#iefix)
      format("embedded-opentype"),
    url(../assets/font/nanum/NanumBarunGothic.woff2) format("woff2"),
    url(../assets/font/nanum/NanumBarunGothic.woff) format("woff"),
    url(../assets/font/nanum/NanumBarunGothic.ttf) format("truetype");
}

@font-face {
  font-family: "Nanum-Barun-Gothic-Bold";
  font-style: normal;
  font-weight: 700;
  src: url(../assets/font/nanum/NanumBarunGothicBold.eot);
  src: local("Nanum Barun Gothic Bold"), local("NanumBarunGothicBold"),
    url(../assets/font/nanum/NanumBarunGothicBold.eot?#iefix)
      format("embedded-opentype"),
    url(../assets/font/nanum/NanumBarunGothicBold.woff2) format("woff2"),
    url(../assets/font/nanum/NanumBarunGothicBold.woff) format("woff"),
    url(../assets/font/nanum/NanumBarunGothicBold.ttf) format("truetype");
}
</style>
