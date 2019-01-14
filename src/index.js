var classOnly = /^\.([\w-]+)$/
function isAncestor (element, container) {
  return (container.compareDocumentPosition(element) & 16) === 16
}
function isstr (s) { return typeof s === 'string' }
function isobj (o) { return typeof o === 'object' }
function arrayLike (o) { return isobj(o) && isFinite(o.length) }
function toArray (a) { return [].slice.call(a, 0) }
function isNode (el) {
  var t // 1: Node.ELEMENT_NODE / 9: Node.DOCUMENT_NODE
  return el && isobj(el) && (t = el.nodeType) && (t === 1 || t === 9)
}
function flatten (ar) {
  var r = []
  var i = 0
  var l = ar.length
  for (; i < l; ++i) arrayLike(ar[i]) ? (r = r.concat(ar[i])) : (r[r.length] = ar[i])
  return r
}
function normalizeRoot (root) {
  if (!root) {
    return document
  }
  if (isstr(root)) {
    return qwery(root)[0]
  }
  if (!root.nodeType && arrayLike(root)) {
    return root[0]
  }
  return root
}

/**
 * @param {string|Array.<Element>|Element|Node} selector
 * @param {string|Array.<Element>|Element|Node=} opt_root
 * @return {Array.<Element>}
 */
function qwery (selector, optRoot) {
  var m
  var root = normalizeRoot(optRoot)

  if (!root || !selector) {
    return []
  }

  if (selector === window || isNode(selector)) {
    return !optRoot || (selector !== window && isNode(root) && isAncestor(selector, root)) ? [selector] : []
  }

  if (selector && arrayLike(selector)) {
    return flatten(selector)
  }

  if (document.getElementsByClassName && isstr(selector) && (m = selector.match(classOnly))) {
    return toArray((root).getElementsByClassName(m[1]))
  }

  // using duck typing for 'a' window or 'a' document (not 'the' window || document)
  if (selector && (selector.document || (selector.nodeType && selector.nodeType === 9))) {
    return !optRoot ? [selector] : []
  }

  return toArray((root).querySelectorAll(selector))
}

export default qwery
