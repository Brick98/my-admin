export default {
  // 设置没有实例
  functional: true,
  props: {
    number: Number,
    renderFun: Function
  },
  render: (h, ctx) => {
    return ctx.props.renderFun(h, ctx.props.number)
  }
}
