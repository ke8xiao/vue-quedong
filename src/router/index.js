import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/expert/MyMedicine.vue'),
  },
  {
    path: '/met',
    component: () => import('../views/expert/MetTrainning'),
  },
  {
    path: '/kfstage',
    component: () => import('../views/expert/KfuStage'),
  },
  {
    path: '/kfestimate',
    component: () => import('../views/expert/KfuEstimate'),
  },
  {
    path: '/sicklist',
    component: () => import('../views/expert/SickList'),
  },
  {
    path: '/avoidsymptom',
    component: () => import('../views/expert/AvoidSymptom'),
  },
  {
    path: '/body',
    component: () => import('../views/expert/Body'),
  },
  {
    path: '/kfscheme',
    component: () => import('../views/expert/KfuScheme'),
  },
  {
    path: '/choosesick',
    name: 'chooseSick',
    meta: {
      title: 'chooseSick',
      //   icon: 'el-icon-s-tools',
    },
    component: () => import('@/views/expert/ChooseSick'),
  },
  //治疗师端
  {
    path: '/doctor/patient',
    name: 'patient',
    meta: {
      title: 'patient',
    },
    component: () => import('../views/doctor/Patient'),
  },
  {
    path: '/doctor/managepatient',
    name: 'ManagePatient',
    meta: {
      title: 'ManagePatient',
    },
    component: () => import('../views/doctor/ManagePatient'),
  },
  {
    path: '/doctor/reservation',
    name: 'reservation',
    meta: {
      title: 'reservation',
    },
    component: () => import('../views/doctor/Reservation'),
  },
  {
    path: '/doctor/diseasediagnoses',
    name: 'Disease diagnoses',
    meta: {
      title: 'Disease diagnoses',
    },
    component: () => import('../views/doctor/Disease diagnoses'),
  },
  {
    path: '/doctor/kfprocess',
    name: 'Kfprocess',
    meta: {
      title: 'Kfprocess',
    },
    component: () => import('../views/doctor/Kfprocess'),
  },
  {
    path: '/doctor/kfestimate',
    name: 'kfestimate',
    meta: {
      title: 'kfestimate',
    },
    component: () => import('../views/doctor/Kfestimate'),
  },
  {
    path: '/doctor/startestimate',
    name: 'StartEstimate',
    meta: {
      title: 'StartEstimate',
    },
    component: () => import('../views/doctor/StartEstimate'),
  },
  {
    path: '/doctor/myappointment',
    name: 'MyAppointment',
    meta: {
      title: 'MyAppointment',
    },
    component: () => import('../views/doctor/MyAppointment'),
  },
  {
    path: '/doctor/mywork',
    name: 'MyWork',
    meta: {
      title: 'MyWork',
    },
    component: () => import('../views/doctor/MyWork'),
  },
  {
    path: '/doctor/newpatient',
    name: 'newPatient',
    meta: {
      title: 'newPatient',
    },
    component: () => import('../views/doctor/New Patient.vue'),
  },
  {
    path: '/doctor/train',
    name: 'Train',
    meta: {
      title: 'Train',
    },
    component: () => import('../views/doctor/Train.vue'),
  },
  {
    path: '/doctor/starttrain',
    name: 'StartTrain',
    meta: {
      title: 'StartTrain',
    },
    component: () => import('../views/doctor/StartTrain.vue'),
  },
  {
    path: '/doctor/prescriptionmanage',
    name: 'PrescriptionManage',
    meta: {
      title: 'PrescriptionManage',
    },
    component: () => import('../views/doctor/PrescriptionManage.vue'),
  },

  /* 
  {
    path: '/doctor',
    //name: '治疗师',
    icon: 'el-icon-s-tools',
    // component: Admin,
    meta: {
      title: '治疗师',
      icon: 'el-icon-s-tools',
    },
    children: [
      {
        path: '/doctor/patient',
        component: () => import('../views/doctor/Patient.vue'),
        meta: {
          title: '患者管理',
          icon: 'el-icon-s-tools',
        },
      },
    ],
  }, */
]

const router = new VueRouter({
  routes,
  mode: 'hash',
})
export default router
