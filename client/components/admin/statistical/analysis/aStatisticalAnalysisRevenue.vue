<template>
    <!--a_statistical_analysis_revenue-->

    <v-card tile flat>
        <!--Header-->
        <v-sheet class="d-flex align-center px-4 py-2" color="heading">
            <span class="text-h5 heading_text--text font-weight-bold">Revenue Analysis</span>

            <v-spacer></v-spacer>

            <div>
                <!--Select Type Format-->
                <v-menu offset-y left nudge-bottom="5">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn 
                            v-bind="attrs" v-on="on" 
                            small rounded color="primary"
                            elevation="0"
                        >
                            Hiển Thị Theo {{view}}
                        </v-btn>
                    </template>

                    <v-list dense>
                        <v-list-item @click="SetFormat('mm')">
                            <v-list-item-title>Xem theo tháng</v-list-item-title>
                        </v-list-item>

                        <v-list-item @click="SetFormat('yy')">
                            <v-list-item-title>Xem theo năm</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>

                <!--Select Date-->
                <v-menu offset-y left nudge-bottom="5">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn 
                            v-bind="attrs" v-on="on" 
                            small rounded color="primary"
                            elevation="0"
                        >
                            {{ datePicker }}
                        </v-btn>
                    </template>

                    <v-card>
                        <v-date-picker 
                            v-model="datePicker" 
                            type="month" color="primary"
                            @change="$fetch()"
                        ></v-date-picker>
                    </v-card>
                </v-menu>
            </div>
        </v-sheet>

        <!--Fetch Pendding-->
        <v-card-text v-if="$fetchState.pending || $fetchState.error">
            <v-alert type="error" color="error" class="BoxShadow" v-if="$fetchState.error">{{ $fetchState.error.message }}</v-alert>
            
            <v-skeleton-loader type="image" class="BoxShadow"></v-skeleton-loader>
        </v-card-text>

        <!--Fetch Done-->
        <v-card-text v-else>
            <v-sheet>
                <v-sparkline
                    :labels="labels"
                    :value="value"
                    auto-draw
                    stroke-linecap="round"
                    :smooth="16"
                    color="white"
                    :gradient="['#f72047', '#ffd200', '#1feaea']"
                    :line-width="2"
                    :label-size="5"
                    class="grey--text"
                ></v-sparkline>
            </v-sheet>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    data () {
        return {
            datePicker: new Date().toISOString().substr(0, 7),

            products: [],

            value: [],
            labels: [],

            format: 'yy',
            view: 'Năm'
        }
    },

    async fetch (){
        try {
            let date = this.datePicker.split('-');

            let Products = await this.$axios.$post(this.$api.laptop.admin.GetRevenueAnalysisStatistical, {
                date: {
                    yy: date[0],
                    mm: date[1],
                }
            });
            
            this.products = Products;

            if(this.format == 'mm') return this.DataFormat_Month();
            if(this.format == 'yy') return this.DataFormat_Year();
        }
        catch(e){
            throw new Error(e.toString());
        }
    },

    fetchOnServer: false,

    methods: {
        SetFormat (type) {
            this.format = type;

            if(this.format == 'mm') {
                this.view = 'tháng';
                return this.DataFormat_Month();
            }
            if(this.format == 'yy') {
                this.view = 'năm';
                return this.DataFormat_Year();
            }
        },

        DataFormat_Year () {
            this.value = [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            ];
            this.labels = [
                '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
            ];

            this.products.forEach(item => {
                let date = item.sold.date;
                let priceRevenue = item.statistical.price.revenue;
                let oldValue = this.value[Number(date.mm - 1)];

                this.value[Number(date.mm - 1)] = oldValue + priceRevenue;
            });
        },

        DataFormat_Month () {
            let Data = this.SetValueLabelsByMonth();
            this.value = Data.value;
            this.labels = Data.labels;

            this.products.forEach(item => {
                let date = item.sold.date;
                let priceRevenue = item.statistical.price.revenue;
                let oldValue = this.value[Number(date.dd - 1)];

                this.value[Number(date.dd - 1)] = oldValue + priceRevenue;
            });
        },

        SetValueLabelsByMonth () {
            let datePicker = this.datePicker.split('-');
            let lastDate = new Date(datePicker[0], datePicker[1], 0).getDate();
            let labels = [];
            let value = [];

            for (let i = 1; i <= lastDate; i++) {
                labels.push(i);
                value.push(0);
            };

            return {
                labels: labels,
                value: value
            };
        }
    }
}
</script>