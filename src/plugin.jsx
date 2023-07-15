export function PluginComponent(props) {
  const blockContent = props.children[0]
  return <h1>{blockContent}</h1>
}

export default withResizeDetector(PluginComponent)
