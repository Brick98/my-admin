import Home from '@/views/Home.vue'
import Layout from '@/views/layout.vue'
import { file } from '@/lib/util'

// 需要权限过滤的数组
export const routerMap = [
  // 别名
  {
    path: '/',
    // alias: '/home_page',
    name: 'home',
    meta: {
      title: '首页'
    },
    component: Layout,
    children: [
      {
        name: 'home_index',
        path: 'home',
        meta: {
          title: '首页'
        },
        component: Home
      },
      {
        name: 'table',
        path: 'table',
        meta: {
          title: 'table'
        },
        component: () => import('@/views/table.vue')
      },
      {
        name: 'folder_tree',
        path: 'folder_tree',
        meta: {
          title: 'folder_tree'
        },
        // component: () => import('@/views/folder-tree/folder-tree.vue')
        component: () => file('folder-tree/folder-tree.vue')
      },
      {
        path: 'upload',
        name: 'upload',
        meta: {
          title: 'upload'
        },
        component: () => import('@/views/upload.vue')
      },
      {
        path: 'form',
        name: 'form',
        meta: {
          title: 'form'
        },
        component: () => import('@/views/form.vue')
      },
      {
        path: 'icon_page',
        name: 'icon_page',
        meta: {
          title: 'icon_page'
        },
        component: () => import('@/views/icon_page.vue')
      },
      {
        path: 'tabs_page',
        name: 'tabs_page',
        meta: {
          title: 'tabs_page'
        },
        component: () => import('@/views/tabs-page.vue')
      },
      {
        path: 'circle_page',
        name: 'circle_page',
        meta: {
          title: 'circle_page'
        },
        component: () => import('@/views/circle-page.vue')
      },
      {
        path: 'modal_form',
        name: 'modal_form',
        meta: {
          title: 'modal_form'
        },
        component: () => import('@/views/modal-form.vue')
      },
      {
        path: 'optimize',
        name: 'optimize',
        meta: {
          title: 'optimize'
        },
        component: () => import('@/views/optimize.vue')
      },
      // 动态路由
      {
        path: 'params/:id',
        name: 'params',
        meta: {
          title: '参数',
          hideInMenu: true
        },
        component: () => import('@/views/argu.vue'),
        props: true
      },
      {
        path: 'mouse_right',
        name: 'mouse_right',
        meta: {
          title: '鼠标右键'
        },
        component: () => import('@/views/mouse-right.vue')
      },
      {
        // 数字动画
        path: '/count-to',
        name: 'count_to',
        meta: {
          title: 'count_to'
        },
        component: () => import('@/views/count-to.vue')
      },
      {
        // 左右分割
        path: '/split-pane',
        name: 'split_pane',
        meta: {
          title: 'split_pane'
        },
        component: () => import('@/views/split-pane.vue')
      },
      {
        // render渲染函数
        path: '/render-page',
        name: 'render_page',
        meta: {
          title: 'render_page'
        },
        component: () => import('@/views/render-page.vue')
      },
      {
        // menu菜单递归
        path: '/menu-page',
        name: 'menu_page',
        meta: {
          title: 'menu_page'
        },
        component: () => import('@/views/menu-page.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/About.vue'),
    props: {
      // food:'banana'
    },
    meta: {
      title: '关于'
    }
  },
  // 嵌套路由
  {
    path: '/parent',
    name: 'parent',
    meta: {
      title: 'parent'
    },
    component: () => import('@/views/parent.vue'),
    children: [
      {
        name: 'child_page',
        path: 'child',
        meta: {
          title: 'child'
        },
        alias: 'child_page',
        component: () => import('@/views/child.vue')
      }
    ]
  },
  // 命名视图 components
  {
    name: 'named_view',
    path: '/named_view',
    meta: {
      title: 'named_view'
    },
    components: {
      default: () => {
        return {
          name: 'named_parent',
          path: '/parent',
          meta: {
            title: 'named_parent'
          },
          component: import('@/views/parent.vue'),
          children: [
            {
              name: 'named_child',
              path: 'child',
              meta: {
                title: 'child'
              },
              component: () => import('@/views/child.vue')
            }
          ]
        }
      },
      // default:()=>import('@/views/parent.vue'),
      email: () => import('@/views/email.vue'),
      tel: () => import('@/views/tel.vue')
    }
  },
  // 重定向
  {
    path: '/main',
    redirect: to => '/'
  },
  {
    name: 'store',
    path: '/store',
    meta: {
      title: 'store'
    },
    component: () => import('@/views/store.vue')
  }
]

// 没有权限 都可访问的数组
export const routes = [
  {
    path: '/',
    // alias: '/home_page',
    name: 'home',
    meta: {
      title: '首页'
    },
    component: Layout,
    children: [
      {
        name: 'home_index',
        path: 'home',
        meta: {
          title: '首页'
        },
        component: Home
      },
      {
        name: 'table',
        path: 'table',
        meta: {
          title: 'table'
        },
        component: () => import('@/views/table.vue')
      },
      {
        name: 'folder_tree',
        path: 'folder_tree',
        meta: {
          title: 'folder_tree'
        },
        // component: () => import('@/views/folder-tree/folder-tree.vue')
        component: () => file('folder-tree/folder-tree.vue')
      },
      {
        path: 'upload',
        name: 'upload',
        meta: {
          title: 'upload'
        },
        component: () => import('@/views/upload.vue')
      },
      {
        path: 'form',
        name: 'form',
        meta: {
          title: 'form'
        },
        component: () => import('@/views/form.vue')
      },
      {
        path: 'icon_page',
        name: 'icon_page',
        meta: {
          title: 'icon_page'
        },
        component: () => import('@/views/icon_page.vue')
      },
      {
        path: 'tabs_page',
        name: 'tabs_page',
        meta: {
          title: 'tabs_page'
        },
        component: () => import('@/views/tabs-page.vue')
      },
      {
        path: 'circle_page',
        name: 'circle_page',
        meta: {
          title: 'circle_page'
        },
        component: () => import('@/views/circle-page.vue')
      },
      {
        path: 'modal_form',
        name: 'modal_form',
        meta: {
          title: 'modal_form'
        },
        component: () => import('@/views/modal-form.vue')
      },
      {
        path: 'optimize',
        name: 'optimize',
        meta: {
          title: 'optimize'
        },
        component: () => import('@/views/optimize.vue')
      },
      // 动态路由
      {
        path: 'params/:id',
        name: 'params',
        meta: {
          title: '参数',
          hideInMenu: true
        },
        component: () => import('@/views/argu.vue'),
        props: true
      },
      {
        path: 'mouse_right',
        name: 'mouse_right',
        meta: {
          title: '鼠标右键'
        },
        component: () => import('@/views/mouse-right.vue')
      },
      {
        // 数字动画
        path: '/count-to',
        name: 'count_to',
        meta: {
          title: 'count_to'
        },
        component: () => import('@/views/count-to.vue')
      },
      {
        // 左右分割
        path: '/split-pane',
        name: 'split_pane',
        meta: {
          title: 'split_pane'
        },
        component: () => import('@/views/split-pane.vue')
      },
      {
        // render渲染函数
        path: '/render-page',
        name: 'render_page',
        meta: {
          title: 'render_page'
        },
        component: () => import('@/views/render-page.vue')
      },
      {
        // menu菜单递归
        path: '/menu-page',
        name: 'menu_page',
        meta: {
          title: 'menu_page'
        },
        component: () => import('@/views/menu-page.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/About.vue'),
    props: {
      // food:'banana'
    },
    meta: {
      title: '关于'
    }
  },
  // 嵌套路由
  {
    path: '/parent',
    name: 'parent',
    meta: {
      title: 'parent'
    },
    component: () => import('@/views/parent.vue'),
    children: [
      {
        name: 'child_page',
        path: 'child',
        meta: {
          title: 'child'
        },
        alias: 'child_page',
        component: () => import('@/views/child.vue')
      }
    ]
  },
  // 命名视图 components
  {
    name: 'named_view',
    path: '/named_view',
    meta: {
      title: 'named_view'
    },
    components: {
      default: () => {
        return {
          name: 'named_parent',
          path: '/parent',
          meta: {
            title: 'named_parent'
          },
          component: import('@/views/parent.vue'),
          children: [
            {
              name: 'named_child',
              path: 'child',
              meta: {
                title: 'child'
              },
              component: () => import('@/views/child.vue')
            }
          ]
        }
      },
      // default:()=>import('@/views/parent.vue'),
      email: () => import('@/views/email.vue'),
      tel: () => import('@/views/tel.vue')
    }
  },
  // 重定向
  {
    path: '/main',
    redirect: to => '/'
  },
  {
    name: 'store',
    path: '/store',
    meta: {
      title: 'store'
    },
    component: () => import('@/views/store.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue')
  },
  {
    path: '*',
    component: () => import('@/views/error_404.vue')
  }
]
