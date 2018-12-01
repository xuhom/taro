import h from './history'
import resolvePathname from 'resolve-pathname'

export interface NavigateOpts {
  url?: string;
  state?: number;
  delta?: number;
  isForward?: boolean;
  success?: Function;
  fail?: Function;
  complete?: Function;
}

const navigateTo = function (opts = {} as NavigateOpts) {
  const current = h.now()
  const currentUrl = current.url
  const url = resolvePathname(opts.url, currentUrl)
  var idx = -1;
  for (var i =0; i < h.locationStack.length; i++) {
    if (h.locationStack[i].url === url) {
      idx = i;
      break
    }
  }
  if (idx !== -1) {
    navigateBack({delta: h.locationStack.length - idx - 1});
  } else {
    url = {url}
    h.push(url);
  }
  return Promise.resolve()
}

const navigateBack = (opts = {} as NavigateOpts) => {
  let delta = opts.delta
  if (typeof delta !== 'number') {
    delta = 1
  }
  window.history.go(-1 * delta)
}

const redirectTo = function (opts = {} as NavigateOpts) {
  // const success = opts.success
  // const fail = opts.fail
  // const complete = opts.complete

  h.replace({
    url: opts.url
    /* TODO: success fail complete*/
  })
  return Promise.resolve()
}

export {
  navigateTo,
  navigateBack,
  redirectTo
}
