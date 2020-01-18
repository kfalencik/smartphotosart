<template>
    <div class="loading">
        <img :src="require('@/assets/images/loading.gif')" alt="Loading">
    </div>
</template>

<style lang="scss" scoped>
    .loading {
        height: 80vh;
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
    }
</style>