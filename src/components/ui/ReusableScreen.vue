<script setup>
defineProps({
  useFlex: {
    type: Boolean,
    default: true,
  },
  hideImgOnTablet: {
    type: Boolean,
    default: false,
  },
  bgColor: {
    type: String,
    default: 'var(--color-background-purple)',
  },
  textColor: {
    type: String,
    default: 'var(--color-text-light)',
  },
  paddingRight: {
    type: String,
    default: '0',
  },
  blockHeight: {
    type: String,
    default: 'fit-content',
  },
  mobileHeight: {
    type: String,
    default: '600px',
  },
  desctopHeight: {
    type: String,
    default: '420px',
  },
  tabletHeight: {
    type: String,
    default: '344px',
  },
  imgWidth: {
    type: String,
    default: '45%',
  },
  imgMinWidth: {
    type: String,
    default: '257px',
  },
  imgMaxWidth: {
    type: String,
    default: '319px',
  },
  imgMinHeight: {
    type: String,
    default: 'auto',
  },
  imgMaxHeight: {
    type: String,
    default: 'auto',
  },
  imgPaddingTop: {
    type: String,
    default: '60px',
  },
  wrapperWidthTablet: {
    type: String,
    default: '55%',
  },
  wrapperWidthDesctop: {
    type: String,
    default: '55%',
  }
})
</script>

<template>
  <div class="main-screen" :style="{
    '--main-screen_bg-color': bgColor,
    '--main-screen_text-color': textColor,
    '--main-screen_block-height': blockHeight,
    '--main-screen_desctop-height': desctopHeight,
    '--main-screen_mobile-height': mobileHeight,
  }">
    <div class="main-screen__wrapper" :style="{
      '--main-screen_tablet-height': tabletHeight,
      '--main-screen_tablet-padding-right': paddingRight,
      '--main-screen_tablet-wrapper-width-tablet': wrapperWidthTablet,
      '--main-screen_tablet-wrapper-width-desctop': wrapperWidthDesctop,
    }">
      <div class="main-screen__title-box">
        <h1 class="main-screen__title">
          <slot name="title"></slot>
        </h1>
      </div>
      <div class="main-screen__description-box">
        <span class="main-screen__description">
          <slot name="description"></slot>
        </span>
      </div>
    </div>

    <div class="main-screen__img-box" :style="{
  '--main-screen_tablet-img-margin-top': imgPaddingTop,
  '--img-min-width': imgMinWidth,
  '--img-max-width': imgMaxWidth,
  '--img-min-height': imgMinHeight,
  '--img-max-height': imgMaxHeight,
    }">
      <slot name="img"></slot>
      <slot name="gallery"></slot>
    </div>
  </div>
</template>

<style lang="scss">
@use '@/assets/scss/mixins.scss' as *;

.main-screen {
  @include minmax-width-mobile;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  min-width: var(--min-width);
  max-width: 1190px;
  width: calc(100% + 34px);
  height: fit-content;
  gap: 24px;
  padding-top: 40px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: var(--main-screen_bg-color);
  border-radius: 12px;
  position: relative;

  @media only screen and (max-width: 767px) {
    flex-direction: column;
    align-items: center;
    min-height: var(--main-screen_mobile-height);
  }

  @media only screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    height: fit-content;
    gap: 10px;
    padding: 0;
    padding-left: 52px;
    margin-top: 15px;
    border-radius: 30px;
  }

  @media only screen and (min-width: 1280px) {
    height: var(--main-screen_desctop-height);
    gap: 10px;
    border-radius: 40px;
  }

  &__wrapper {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 20px;
    height: fit-content;

    @media only screen and (min-width: 768px) {
      min-height: var(--main-screen_tablet-height);
      gap: 24px;
      width: var(--main-screen_tablet-wrapper-width-tablet);
      padding-right: var(--main-screen_tablet-padding-right);
      padding-top: 60px;
      margin-bottom: 60px;
    }

    @media only screen and (min-width: 1280px) {
      min-width: 825px;
      width: var(--main-screen_tablet-wrapper-width-desctop);
    }
  }

  &__title-box,
  &__description-box {
    justify-content: center;
    align-items: center;
    width: 100%;
    color: var(--main-screen_text-color);

    @media only screen and (min-width: 768px) {
      height: fit-content;
    }

    @media only screen and (min-width: 1280px) {
      justify-content: flex-start;
    }
  }

  &__title {
    @include h1-mobile;
    margin: 0;

    @media only screen and (min-width: 768px) {
      justify-content: flex-start;
      text-align: left;
      font-size: 36px;
      line-height: 1.25;
    }

    @media only screen and (min-width: 1280px) {
      max-width: 825px;
      font-size: 48px;
    }
  }

  &__description {
    display: flex;
    text-align: center;
    width: 100%;

    @media only screen and (min-width: 768px) {
      text-align: left;
    }

    @media only screen and (min-width: 1280px) {
      max-width: 630px;
      font-size: 20px;
    }
  }

  &__img-box {
    display: flex;
    width: 100%;
    align-items: flex-end;
    justify-content: center;
  
    @media only screen and (min-width: 768px) {
      position: absolute;
      right: 0;
      bottom: 0;
      width: clamp(var(--img-min-width),
          calc(300px + (100vw - 768px) / (1280 - 768) * (500 - 300)),
          var(--img-max-width));
      height: clamp(var(--img-min-height),
          calc(200px + (100vw - 768px) / (1280 - 768) * (400 - 200)),
          var(--img-max-height));
      display: v-bind('hideImgOnTablet ? "none" : "flex"');
    }
  
    @media only screen and (min-width: 1280px) {
      width: var(--img-max-width);
      height: var(--img-max-height);
    }
  }
  
  &__img {
    object-fit: contain;
    width: 100%;
    // pad: 5px;
    border-bottom-right-radius: 30px;
  
    @media only screen and (min-width: 768px) {
      object-fit: cover;
    }
  
    @media only screen and (min-width: 1280px) {
      border-bottom-right-radius: 40px;
    }
  }
  }

.flex-layout {
  display: flex;
}
</style>