/**
 * injectScript - Inject internal script to available access to the `window`
 *
 * @param  {string} file_path - Local path of the internal script.
 * @param  {string} [tag='body'] - The tag as string, where the script will be append.
 * @see    {@link http://stackoverflow.com/questions/20499994/access-window-variable-from-content-script}
 */
function injectScript(file_path, tag = 'body') {
  const node = document.querySelector(tag)
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = file_path
  node.appendChild(script)
}
injectScript(chrome.runtime.getURL('content.js'), 'body')
