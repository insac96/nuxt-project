<template>
    <!--Admin Statistical Page-->
    
    <div>
        <!--Main-->
        <v-card tile flat>
            <!--Header-->
            <v-card-title class="font-weight-bold text-h4 primary--text">Statistical</v-card-title>
            <v-card-subtitle>Thông kê doanh thu</v-card-subtitle>

            <!--General -->
            <AStatisticalGeneral></AStatisticalGeneral>

            <!--Revenue Analysis-->
            <AStatisticalAnalysisRevenue></AStatisticalAnalysisRevenue>
        </v-card>
    </div>
</template>