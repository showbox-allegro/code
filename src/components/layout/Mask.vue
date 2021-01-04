
<template>

   <transition name="back" appear>
        <div class="mask">
            <slot></slot>
        </div>
    </transition>

</template>

<style lang="less">

    .mask {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1001;
        height: 100%;
        background-color: rgba(0,0,0,0.8);
	}
</style>
