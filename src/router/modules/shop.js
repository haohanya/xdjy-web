import Layout from '@/layout'

const shopRouter = {
  path: '/mallmanagement',
  component: Layout,
  redirect: '/mallmanagement/brand',
  name: 'mallmanagement',
  meta: {
    title: '商城管理',
    icon: 'nested'
  },
  children: [
    {
      path: 'brand',
      component: () => import('@/views/mallmanagement/brand/index'), // Parent router-view
      name: 'brand',
      meta: { title: '品牌管理' }
    },
    {
      path: 'category',
      component: () => import('@/views/mallmanagement/classification/index'),
      name: 'category',
      meta: {title: '分类管理'}
    },
    {
      path: 'commodity',
      component: () => import('@/views/mallmanagement/commodity/index'),
      name: 'commodity',
      meta: {title: '商品管理'}
    }
  ]
}

export default shopRouter
