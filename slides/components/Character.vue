<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps({
  characterName: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  pageNumber: {
    type: Number,
    required: true,
  },
})

const characterName = ref(props.characterName)
const displayName = ref(props.displayName)
const role = ref(props.role)
const pageNumber = ref(props.pageNumber)

const sprites = {
  right1: `/assets/images/characters/${characterName.value}/right-1.png`,
  right2: `/assets/images/characters/${characterName.value}/right-2.png`,
  right3: `/assets/images/characters/${characterName.value}/right-3.png`,
  right4: `/assets/images/characters/${characterName.value}/right-4.png`,
  front1: `/assets/images/characters/${characterName.value}/front-1.png`,
}

let currentSpriteVersion = 'right'
let currentSpriteIndex = 1

let currentSprite = ref(sprites[`${currentSpriteVersion}${currentSpriteIndex}`])

const goInTheMiddle = () => {
  const character = document.querySelector(`.character.character--${characterName.value}`)

  if (character) {
    const intervalCb = () => {
      currentSpriteIndex++

      if (currentSpriteIndex > 4) {
        currentSpriteIndex = 1
      }

      currentSprite.value = sprites[`${currentSpriteVersion}${currentSpriteIndex}`]
    }

    intervalCb()
    let interval = setInterval(intervalCb, 300)

    character.classList.add('in-the-middle')

    setTimeout(() => {
      clearInterval(interval)
      character.classList.remove('in-the-middle')
      currentSpriteVersion = 'front'
      currentSpriteIndex = 1
      currentSprite.value = sprites[`${currentSpriteVersion}${currentSpriteIndex}`]
    }, 3000)
  }
}

const goOutside = () => {
  const character = document.querySelector(`.character.character--${characterName.value}`)
  currentSpriteVersion = 'right'

  if (character) {
    const intervalCb = () => {
      currentSpriteIndex++

      if (currentSpriteIndex > 4) {
        currentSpriteIndex = 1
      }

      currentSprite.value = sprites[`${currentSpriteVersion}${currentSpriteIndex}`]
    }

    intervalCb()
    let interval = setInterval(intervalCb, 300)

    character.classList.add('outside')

    setTimeout(() => {
      clearInterval(interval)
      currentSpriteVersion = 'front'
    }, 3000)
  }
}

onMounted(() => {
  const character = document.querySelector(`.character.character--${characterName.value}`)

  let interval = setInterval(() => {
    if ($slidev.nav.currentPage === pageNumber.value) {
      setTimeout(() => {
        character.classList.add(`character--init`)
      }, 100)

      goInTheMiddle()
      setTimeout(goOutside, 5000)
      clearInterval(interval)
    }
  }, 100)
})
</script>

<template>
  <div class="character" :class="`character--${characterName}`">
    <img :src="currentSprite"  :alt="characterName" w="200px" h="200px" />
  </div>
  <div class='character-desc'>
    <h3 class="character-name">{{ displayName }}</h3>
    <p class="character-role">{{ role }}</p>
  </div>
</template>

<style scoped>
@keyframes go-in-the-middle {
  0% {
    transform: translateX(calc(-50vw - 100%)) translateY(-50%);
  }
  100% {
    transform: translateX(-50%) translateY(-50%);
  }
}

@keyframes go-outside {
  0% {
    transform: translateX(-50%) translateY(-50%);
  }
  100% {
    transform: translateX(calc(50vw)) translateY(-50%);
  }
}

.character {
  position: absolute;
  z-index: 1;
  left: 50%;
  top: 50%;

  /*transform: translateX(-50%) translateY(-50%);*/
  transform: translateX(calc(-50vw - 100%)) translateY(-50%);

  width: 200px;
  height: 200px;

  image-rendering: pixelated;
}

.character--init {
  transform: translateX(-50%) translateY(-50%);
}

.character.in-the-middle {
  animation: go-in-the-middle 3s linear forwards;
}

.character.outside {
  animation: go-outside 3s linear forwards;
}

.character-desc {
  position: absolute;
  left: 50%;
  top: 15%;

  transform: translateX(-50%) translateY(-50%);

  text-align: center;
}

.character-desc h3 {
  font-weight: 600;
}

.character-desc p {
  opacity: 0.6;
}

.character-desc p, .character-desc h3 {
  margin: 0!important;
}
</style>
