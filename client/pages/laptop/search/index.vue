<template>
    <!--Search-Page-->

    <v-card tile flat class="BoxShadow">
        <!--Filter Menu-->
        <v-navigation-drawer v-model="drawer" app temporary floating width="300">
            <v-list nav>
                <!--Remove Filter-->
                <v-list-item class="mb-2" v-if="hasFilter">
                    <v-list-item-title class="font-weight-bold error--text">Xóa Bộ Lọc</v-list-item-title>
                    <v-list-item-action class="my-0">
                        <v-btn icon color="error" @click="DeleteAllFilter"><v-icon>close</v-icon></v-btn>
                    </v-list-item-action>
                </v-list-item>

                <!--Discount-->
                <v-list-item class="mb-2">
                    <v-list-item-title class="font-weight-bold">Chỉ Hiện Giảm Giá</v-list-item-title>
                    <v-list-item-action>
                        <v-switch hide-details inset dense v-model="filter['discount']" @change="$fetch"></v-switch>
                    </v-list-item-action>
                </v-list-item>

                <!--Comapany-->
                <v-list-group v-if="companyes && companyes.length > 0" class="mb-2">
                    <template v-slot:activator>
                        <v-list-item-title class="font-weight-bold">Hãng Sản Xuất</v-list-item-title>
                    </template>

                    <v-list-item v-for="item in companyes" :key="item._id" class="pl-10" dense>
                        <v-list-item-content>{{item.name}}</v-list-item-content>
                        <v-list-item-action>
                            <v-checkbox v-model="filter['company']" :value="item._id" @change="$fetch"></v-checkbox>
                        </v-list-item-action>
                    </v-list-item>
                </v-list-group>

                <!--SCREEN-->
                <v-list-group class="mb-2">
                    <template v-slot:activator>
                        <v-list-item-title class="font-weight-bold">Màn Hình</v-list-item-title>
                    </template>

                    <v-list-item v-for="item in setting.variantConfiguration['screen']" :key="item" class="pl-10" dense>
                        <v-list-item-content>{{item}}</v-list-item-content>
                        <v-list-item-action>
                            <v-checkbox v-model="filter['screen']" :value="item" @change="$fetch"></v-checkbox>
                        </v-list-item-action>
                    </v-list-item>
                </v-list-group>

                <!--CPU-->
                <v-list-group class="mb-2">
                    <template v-slot:activator>
                        <v-list-item-title class="font-weight-bold">CPU</v-list-item-title>
                    </template>

                    <v-list-item v-for="item in setting.variantConfiguration['cpu']" :key="item" class="pl-10" dense>
                        <v-list-item-content>{{item}}</v-list-item-content>
                        <v-list-item-action>
                            <v-checkbox v-model="filter['cpu']" :value="item" @change="$fetch"></v-checkbox>
                        </v-list-item-action>
                    </v-list-item>
                </v-list-group>

                <!--Ram-->
                <v-list-group class="mb-2">
                    <template v-slot:activator>
                        <v-list-item-title class="font-weight-bold">RAM</v-list-item-title>
                    </template>

                    <v-list-item v-for="item in setting.variantConfiguration['ram']" :key="item" class="pl-10" dense>
                        <v-list-item-content>{{item}}</v-list-item-content>
                        <v-list-item-action>
                            <v-checkbox v-model="filter['ram']" :value="item" @change="$fetch"></v-checkbox>
                        </v-list-item-action>
                    </v-list-item>
                </v-list-group>

                <!--HardDrive-->
                <v-list-group class="mb-2">
                    <template v-slot:activator>
                        <v-list-item-title class="font-weight-bold">Ổ Cứng</v-list-item-title>
                    </template>

                    <v-list-item v-for="item in setting.variantConfiguration['harddrive']" :key="item" class="pl-10" dense>
                        <v-list-item-content>{{item}}</v-list-item-content>
                        <v-list-item-action>
                            <v-checkbox v-model="filter['harddrive']" :value="item" @change="$fetch"></v-checkbox>
                        </v-list-item-action>
                    </v-list-item>
                </v-list-group>

                <!--GPU-->
                <v-list-group>
                    <template v-slot:activator>
                        <v-list-item-title class="font-weight-bold">GPU</v-list-item-title>
                    </template>

                    <v-list-item v-for="item in setting.variantConfiguration['gpu']" :key="item" class="pl-10" dense>
                        <v-list-item-content>{{item}}</v-list-item-content>
                        <v-list-item-action>
                            <v-checkbox v-model="filter['gpu']" :value="item" @change="$fetch"></v-checkbox>
                        </v-list-item-action>
                    </v-list-item>
                </v-list-group>
            </v-list>
        </v-navigation-drawer>

        <!--Input Search-->
        <v-sheet color="heading" class="Sticky_Top d-flex align-center px-4 py-2">
            <v-btn fab elevation="0" width="48" height="48" class="mr-2" @click="drawer = !drawer">
                <v-icon>apps</v-icon>
            </v-btn>

            <v-text-field
                v-model="keySearch"
                rounded block solo
                flat
                placeholder="Nhập Tên Sản Phẩm Tìm Kiếm"
                append-icon="search"
                hide-details
                @keyup="$fetch"
            ></v-text-field>
        </v-sheet>

        <!--Filter Show-->
        <v-sheet color="heading" class="px-4 py-1" v-if="hasFilter">
            <v-chip-group column>
                <!--Discount-->
                <v-chip color="error" dark v-if="filter.discount" @click="DeleteFilterDiscount">
                    <span class="font-weight-bold mr-2">Giảm Giá</span>
                    <v-btn icon x-small @click="DeleteFilterDiscount"><v-icon>close</v-icon></v-btn>
                </v-chip>

                <!--Company-->
                <v-chip v-for="(companyID, i) in filter.company" :key="companyID">
                    <span class="font-weight-bold mr-2">{{ GetNameCompanyByID(companyID) }}</span>
                    <v-btn icon x-small @click="DeleteFilter(filter.company, i)"><v-icon>close</v-icon></v-btn>
                </v-chip>

                <!--Screen-->
                <v-chip v-for="(screen, i) in filter.screen" :key="screen">
                    <span class="font-weight-bold mr-2">Screen {{screen}}</span>
                    <v-btn icon x-small @click="DeleteFilter(filter.screen, i)"><v-icon>close</v-icon></v-btn>
                </v-chip>

                <!--CPU-->
                <v-chip v-for="(cpu, i) in filter.cpu" :key="cpu">
                    <span class="font-weight-bold mr-2">CPU {{cpu}}</span>
                    <v-btn icon x-small @click="DeleteFilter(filter.cpu, i)"><v-icon>close</v-icon></v-btn>
                </v-chip>

                <!--RAM-->
                <v-chip v-for="(ram, i) in filter.ram" :key="ram">
                    <span class="font-weight-bold mr-2">RAM {{ram}}</span>
                    <v-btn icon x-small @click="DeleteFilter(filter.ram, i)"><v-icon>close</v-icon></v-btn>
                </v-chip>

                <!--HardDrive-->
                <v-chip v-for="(harddrive, i) in filter.harddrive" :key="harddrive">
                    <span class="font-weight-bold mr-2">HardDrive {{harddrive}}</span>
                    <v-btn icon x-small @click="DeleteFilter(filter.harddrive, i)"><v-icon>close</v-icon></v-btn>
                </v-chip>

                <!--GPU-->
                <v-chip v-for="(gpu, i) in filter.gpu" :key="gpu">
                    <span class="font-weight-bold mr-2">GPU {{gpu}}</span>
                    <v-btn icon x-small @click="DeleteFilter(filter.gpu, i)"><v-icon>close</v-icon></v-btn>
                </v-chip>
            </v-chip-group>
        </v-sheet>

        <!--Fetch Pending-->
        <v-card-text v-if="$fetchState.pending || $fetchState.error">
            <v-row dense>
                <v-col cols="6" sm="3" class="pa-1" v-for="i in 4" :key="i">
                    <div class="card BoxShadow">
                        <v-skeleton-loader type="image, article"></v-skeleton-loader>
                    </div>
                </v-col>
            </v-row>
        </v-card-text>

        <!--Fetch Done-->
        <v-card-text v-else>
            <v-alert type="info" color="primary" class="BoxShadow mb-0" v-if="variants.length < 1">Không Có Kết Quả Phù Hợp</v-alert>

            <v-row dense align="stretch" v-else>
                <v-col 
                    cols="6" sm="3"
                    class="d-flex child-flex"
                    v-for="(variant, indexVariant) in variants" :key="indexVariant"
                >   
                    <GLaptopBoxVariant :variant="variant"></GLaptopBoxVariant>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
import CompanySetting from '@/setting/laptop/company';
import TrademarkSetting from '@/setting/laptop/trademark';
import ConfigurationSetting from '@/setting/laptop/configuration';
import { configuration } from '@/setting/laptop/variant';

export default {
    data () {
        return {
            drawer: false,

            setting: {
                company: CompanySetting,
                trademark: TrademarkSetting,
                configuration: ConfigurationSetting,
                variantConfiguration: configuration
            },

            keySearch: null,

            filter: {
                discount: false,
                company: [],
                screen: [],
                cpu: [],
                ram: [],
                harddrive: [],
                gpu: []
            },

            variants: [],
            companyes: null
        }
    },

    async fetch () {
        try {
            let Variants = await this.$axios.$post(this.$api.laptop.guest.GetListSearchVariant, {
                keySearch: this.keySearch ? this.$String.toConvert(this.keySearch, '-') : this.keySearch,
                filter: this.filter
            });

            this.variants = Variants;

            if(!this.companyes) return this.GetListCompany();
        }
        catch(e){
            throw new Error(e.toString());
        }
    },

    fetchOnServer: false,

    computed: {
        hasFilter () {
            if(this.filter.discount) return true;
            if(this.filter.company.length > 0) return true;
            if(this.filter.screen.length > 0) return true;
            if(this.filter.cpu.length > 0) return true;
            if(this.filter.ram.length > 0) return true;
            if(this.filter.harddrive.length > 0) return true;
            if(this.filter.gpu.length > 0) return true;
            return false;
        }
    },

    methods: {
        async GetListCompany () {
            try {
                let Companyes = await this.$axios.$get(this.$api.laptop.guest.GetListCompanyInfo);

                this.companyes = Companyes;
            }
            catch(e){
                return false;
            }
        },

        DeleteFilter (list, indexItem){
            this.$delete(list, indexItem);

            this.$fetch();
        },

        DeleteFilterDiscount () {
            this.filter.discount = false;

            this.$fetch();
        },

        DeleteAllFilter () {
            Object.assign(this.filter, {
                discount: false,
                company: [],
                screen: [],
                cpu: [],
                ram: [],
                harddrive: [],
                gpu: []
            });

            this.$fetch();
        },

        GetNameCompanyByID (id) {
            let index = this.companyes.findIndex(i => i._id == id);
            if(index < 0) return null;

            return this.companyes[index].name;
        }
    }
}
</script>