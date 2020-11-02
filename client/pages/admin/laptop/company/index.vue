<template>
    <!--Laptop Company Index-->

    <v-card tile flat>
        <!--Header-->
        <v-sheet class="d-flex justify-space-between align-center">
            <div>
                <v-card-title class="font-weight-bold text-h4 primary--text">Companyes</v-card-title>
                <v-card-subtitle>Danh sách các hãng sản xuất</v-card-subtitle>
            </div>

            <v-btn 
                color="primary" dark rounded 
                elevation="0" large class="mr-4" 
                @click="ShowCompanyDialogCreate"
            >
                <v-icon>add</v-icon>
                Thêm Mới
            </v-btn>
        </v-sheet>

        <!--Body-->
        <v-sheet>
            <!--Table-->
            <v-simple-table class="Table" fixed-header>
                <template v-slot:default>
                    <!--Table Header-->
                    <thead>
                        <tr>
                            <th width="100" >Logo</th>
                            <th >Tên Hãng</th>
                            <th class="text-center" width="150">Sản Phẩm</th>
                            <th class="text-right" width="150" >Chức Năng</th>
                        </tr>
                    </thead>

                    <!--Table Body-->
                    <tbody>
                        <tr v-for="(company, indexCompany) in Companyes" :key="indexCompany">
                            <!-- Company Logo -->
                            <td>
                                <v-card flat width="100">
                                    <v-img :src="company.logo" :alt="company.name" max-width="100%">
                                    </v-img>
                                </v-card>
                            </td>

                            <!-- Company Name -->
                            <td class="py-5">
                                <span class="text-uppercase font-weight-bold text-h6 primary--text">{{ company.name }}</span>

                                <!-- Trademark -->
                                <div class="mt-1">
                                    <v-chip 
                                        v-for="(trademark, indexTrademark) in company.trademarks" 
                                        :key="indexTrademark" 
                                        label class="mr-1 my-1"
                                        @click="ShowTrademarkDialogEdit(trademark, company, indexTrademark)"
                                    >
                                        {{ trademark.name }}
                                    </v-chip>

                                    <v-chip label class="mr-1 my-1" color="teal" dark @click="ShowTrademarkDialogCreate(company)">
                                        <v-icon small>add</v-icon>
                                    </v-chip>
                                </div>
                            </td>
                            
                            <!-- Company Product Count -->
                            <td class="text-center">{{ company.productCount }}</td>

                            <!-- Function -->
                            <td class="text-right">
                                <v-btn 
                                    color="info" dark fab small elevation="0" 
                                    @click="ShowCompanyDialogEdit(company)"
                                >
                                    <v-icon>edit</v-icon>
                                </v-btn>

                                <v-btn
                                    color="error" dark fab small elevation="0"  
                                    @click="ShowCompanyDialogDelete(company, indexCompany)"
                                >
                                    <v-icon>delete</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>

            <!--If List Companyes Empty-->
            <v-alert
                v-if="Companyes.length < 1" 
                class="mb-0" tile
            >
                Không có công ty nào hiển thị
            </v-alert>

            <!--Body Footer-->
            <v-sheet class="d-flex justify-space-between align-center py-2 px-4" color="heading">
                <!--Count-->
                <v-chip> 
                    <span>{{Companyes.length}} / {{Companyes.length}}</span>
                </v-chip>
            </v-sheet>
        </v-sheet>

        <!--Dialog Create Company-->
        <v-dialog v-model="CompanyDialog.create" persistent max-width="450">
            <ALaptopCompanyCreate 
                @cancel="CompanyDialog.create = false" 
                :companyes="Companyes"
            ></ALaptopCompanyCreate>
        </v-dialog>

        <!--Dialog Edit Company-->
        <v-dialog v-model="CompanyDialog.edit.type" persistent max-width="450">
            <ALaptopCompanyEdit 
                @cancel="CompanyDialog.edit.type = false" 
                :company="CompanyDialog.edit.select"
            ></ALaptopCompanyEdit>
        </v-dialog>

        <!--Dialog Delete Company-->
        <v-dialog v-model="CompanyDialog.delete.type" persistent max-width="450">
            <ALaptopCompanyDelete 
                @delete="$delete(Companyes, CompanyDialog.delete.index)"
                @cancel="CompanyDialog.delete.type = false" 
                :company="CompanyDialog.delete.select"
            ></ALaptopCompanyDelete>
        </v-dialog>

        <!--Dialog Create Trademark-->
        <v-dialog v-model="TrademarkDialog.create.type" persistent max-width="450">
            <ALaptopTrademarkCreate 
                @cancel="TrademarkDialog.create.type = false" 
                :company="TrademarkDialog.create.company"
            ></ALaptopTrademarkCreate>
        </v-dialog>

        <!--Dialog Edit Trademark-->
        <v-dialog v-model="TrademarkDialog.edit.type" persistent max-width="450">
            <ALaptopTrademarkEdit 
                @delete="$delete(TrademarkDialog.edit.company.trademarks, TrademarkDialog.edit.index)"
                @cancel="TrademarkDialog.edit.type = false" 
                :trademark="TrademarkDialog.edit.select"
            ></ALaptopTrademarkEdit>
        </v-dialog>
    </v-card>
</template>

<script>
import LaptopAPI from '@/setting/laptop/api';

export default {    
    async asyncData({$axios}){
        try {
            let Companyes = await $axios.$get(LaptopAPI.admin.GetAllCompany);

            return {
                Companyes: Companyes
            }
        }
        catch(e){
            return {
                Companyes: []
            }
        }
    },

    data () {
        return {
            CompanyDialog: {
                create: false,
                delete: {
                    type: false,
                    index: null,
                    select: null
                },
                edit: {
                    type: false,
                    index: null,
                    select: null,
                    clone: null
                },
            },
            TrademarkDialog: {
                edit: {
                    type: false,
                    index: null,
                    company: null,
                    select: null,
                },
                create: {
                    type: false,
                    company: null
                },
            }
        }
    },

    methods: {
        //Create Company
        ShowCompanyDialogCreate () {
            this.CompanyDialog.create = true;
        },

        //Delete Company
        ShowCompanyDialogDelete (companySelect, index) {
            this.CompanyDialog.delete.index = index;
            this.CompanyDialog.delete.select = companySelect;

            this.CompanyDialog.delete.type = true;
        },

        //Edit Company
        ShowCompanyDialogEdit (companySelect) {
            this.CompanyDialog.edit.select = companySelect;
            this.CompanyDialog.edit.type = true;
        },

        //Edit Trademark
        ShowTrademarkDialogEdit (trademarkSelect, companySelect, indexTrademark) {
            this.TrademarkDialog.edit.company = companySelect;
            this.TrademarkDialog.edit.index = indexTrademark;
            this.TrademarkDialog.edit.select = trademarkSelect;

            this.TrademarkDialog.edit.type = true;
        },

        //Create Trademark
        ShowTrademarkDialogCreate (companySelect) {
            this.TrademarkDialog.create.company = companySelect;
            
            this.TrademarkDialog.create.type = true;
        }
    }
}
</script>