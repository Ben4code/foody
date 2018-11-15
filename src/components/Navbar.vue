<template>
    <div class="navbar">
        <nav class="nav-extended purple darken-2">
            <div class="nav-wrapper container">
            <router-link :to="{name: 'dashboard'}">
                <span class="nav-title">Foody</span>
            </router-link>
            <a href="#" class="btn-floating btn-large halfway-fab pink">
                <router-link :to="{name: 'addsmoothie'}">
                    <i class="material-icons">add</i>
                </router-link>
            </a>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
    data(){
        return {

        }
    }
}
</script>

<style>

</style>
