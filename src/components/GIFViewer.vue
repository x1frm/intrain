<template>
    <div class="gif">
        <img :src="gifSrc" />
    </div>
</template>

<script>
export default {
    name: 'GIFViewer',
    props: {
        currentStop: Number
    },
    computed: {
        gifSrc() {
            return '/assets/gif/' +  (this.currentStop % 18 + 1) + '.gif';
        }
    }
}
</script>