import Layout from '@/layout'

const systemRouter = {
  path: '/system',
  component: Layout,
  redirect: 'noRedirect',
  name: 'System',
  meta: {
    title: '系统设置',
    icon: 'system'
  },
  children: [
    {
      path: 'user',
      component: () => import('@/views/system/user'),
      name: 'SystemUser',
      meta: { title: '用户管理', noCache: true }
    }
  ]
}

export default systemRouter
