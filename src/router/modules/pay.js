import Layout from '@/layout'

const payRouter =
  {
      path: '/pay',
      component: Layout,
      redirect: '/pay/menu1',
      name: 'Pay',
      meta: {
        title: '缴费管理',
        icon: 'nested'
      },
      children: [
        {
          path: 'dorm-pay',
          component: () => import('@/views/pay/dorm-pay/index'), // Parent router-view
          name: 'Dorm-pay',
          meta: { title: '宿舍缴费' },
          },
          {
            path: 'menu2',
            component: () => import('@/views/pay/menu2/index'),
            name: 'Menu2',
            meta: { title: '缴费记录' },
            },
]

  }


export default payRouter
