<template>
    <!--gLaptopProductBoxVariant-->

    <v-hover>
        <v-card 
            color="boxProduct"
            class="'d-flex flex-column BoxShadow"
            :ripple="false"
            :to="`/laptop/product/${variant.product.link}?variant=${variant.code}`"
        >
            <!--Image-->
            <v-img 
                class="mx-auto" 
                :src="$Image.Get(variant.product.images[0], 'm')"
                :alt="variant.name"
                width="100%"
                :aspect-ratio="1.5" contain
            >
                <template v-slot:placeholder>
                    <v-sheet width="100%" height="100%" color="card" class="d-flex justify-center align-center">
                        <v-progress-circular
                            indeterminate
                            color="primary"
                        ></v-progress-circular>
                    </v-sheet>
                </template>
            </v-img>
            
            <!--Status and Discount Amount-->
            <div class="d-flex">
                <v-chip 
                    label color="primary" 
                    class="rounded-0 font-weight-bold px-2 px-md-3 text-caption text-md-subtitle-2"
                >
                    {{variant.status}}
                </v-chip>

                <v-chip
                    v-if="variant.discount.type"
                    label color="error" 
                    class="rounded-0 font-weight-bold px-2 px-md-3 text-caption text-md-subtitle-2"
                >
                    - {{ $String.toPrice(variant.discount.amount) }}đ
                </v-chip>
            </div>

            <!--Information-->
            <v-card-text class="py-2 py-md-4">
                <div
                    class="text-subtitle-1 text-md-h6 font-weight-bold Text-Nowap"
                    style="line-height: 1.4em;"
                >
                    {{variant.product.name}}
                </div>
                <span class="Text-Nowap text-caption text-md-subtitle-2">{{variant.code}}</span>
            </v-card-text>

            <v-spacer></v-spacer>

            <!--Price-->
            <v-card-text class="text-center pt-0 pb-2 pb-md-4">
                <div class="text-h6 font-weight-bold error--text">
                    <span v-if="variant.discount.type">
                        {{ $String.toPrice(variant.warehouse.export.price - variant.discount.amount) }}đ
                    </span>
                    <span v-else>
                        {{ $String.toPrice(variant.warehouse.export.price) }}đ
                    </span>
                </div>
                
                <div class="text-subtitle-2 text-decoration-line-through">
                    <span v-if="variant.discount.type">
                        {{ $String.toPrice(variant.warehouse.export.price) }}đ
                    </span>

                    <span v-else>
                        Discount
                    </span>
                </div>
            </v-card-text>
        </v-card>
    </v-hover>
</template>

<script>
export default {
    props: ['variant']
}
</script>