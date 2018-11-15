<template>
    <div class="index">
        <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
            <div class="card-content">
                <i class="material-icons delete" @click="deleteItem(smoothie.id)">delete</i>
                <h2 class="purple-text">{{smoothie.title}}</h2>
                <ul class="ingredents">
                    <li v-for="(ing, index) in smoothie.ingredents" :key="index">
                        <span class="chip">{{ing}}</span>
                    </li>
                </ul>
            </div>
            <span class="btn-floating btn-large halfway-fab pink">
                <router-link :to="{name: 'editSmoothie', params:{ smoothie_slug: smoothie.slug}}">
                    <i class="material-icons edit">edit</i>
                </router-link>
            </span>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init';

export default {
    data(){
        return{
            smoothies: []
        }
    },
    created(){
        db.collection('smoothies').get()
        .then(query=>{
            query.forEach((doc)=>{
                let smoothie = doc.data();
                smoothie.id = doc.id;
                this.smoothies.push(smoothie);
            })
        }).catch(err => { alert(err); })
    },
    methods:{
        deleteItem(id){
            db.collection('smoothies').doc(id).delete()
            .then(()=>{
                this.smoothies = this.smoothies.filter(smoothie => {
                    return smoothie.id !== id;
                });     
            })
        }
    },
}
</script>

<style>
    .index{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 30px;
        margin-top: 60px;
    }
    .index h2{
        font-size: 1.8em;
        text-align: center;
        margin-top: 0;
    }
    .index .ingredents{
        margin: 30px auto;
    }
    .index .ingredents li{
        display: inline-block;
    }
    .index .delete{
        position: absolute;
        top: 4px;
        right: 4px;
        cursor: pointer;
        color: #aaa;
        font-size: 1.4em;
    }
</style>
