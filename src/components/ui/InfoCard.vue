<template>
  <div class="info-card-wrapper">
    <div class="info-card">
      <div class="image-container">
        <img :src="imageUrl" :alt="title" class="rounded-image" />
      </div>
      <div class="text-content">
        <h2 class="title">{{ title }}</h2>
        <p class="description">{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  imageUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
</script>

<style scoped lang="scss">
@use '@/assets/scss/mixins.scss' as *;

.info-card-wrapper {
  position: relative;
  min-height: var(--main-screen_block-height);
  display: flex;
  justify-content: center;
}

.info-card {
  @include display-flex-column-center;
  position: relative;
  width: 100%;
  gap: 10px;
  padding: 20px;
  background-color: var(--color-background-light-blue);
  border-radius: var(--cards-border-radius);

  .image-container {
    width: 150px;
    height: 150px;

    .rounded-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
  }

  .text-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 10px;

    .title {
      color: #000000;
      font-size: 20px;
      line-height: 1.5;
      text-align: center;
      width: 100%;
    }

    .description {
      color: #000000;
      line-height: 1.5;
      font-size: 18px;
      text-align: center;
      max-width: 100%;
      word-break: break-word;
    }
  }
}

@media only screen and (min-width: 768px) {
  .info-card {
    flex-direction: row;
    align-items: center;
    gap: 30px;
    padding: 30px;
    min-width: 650px;

    .image-container {
      width: 200px;
      height: 200px;
      flex-shrink: 0;
    }

    .text-content {
      align-items: flex-start;

      .title {
        font-size: 20px;
        text-align: left;
      }

      .description {
        font-size: 18px;
        text-align: left;
      }
    }
  }
}

@media only screen and (min-width: 1280px) {
  .info-card {
    max-width: 1190px;
    height: 228px;
    padding: 40px 40px 40px 200px;
    gap: 50px;
    border-radius: 100px var(--cards-border-radius) var(--cards-border-radius) 100px;

    .image-container {
      position: absolute;
      width: 228px;
      height: 228px;
      left: -10px;
      top: 50%;
      transform: translateY(-50%);
    }

    .text-content {
      gap: 20px;
      padding-left: 80px;

      .title {
        font-size: 32px;
      }

      .description {
        font-size: 20px;
      }
    }
  }
}
</style>

