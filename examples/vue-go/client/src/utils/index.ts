export function getAPIURL(version = 'v1'): URL {
  const url = new URL(window.location.toString())
  url.hostname = url.hostname.replace(/^www\./, '')
  url.pathname = `/api/${version}/${url.pathname}`
  return url
}

export async function ajax(url: URL, method = 'GET', data?: FormData | Record<string, any>): Promise<Response> {
  if (['GET', 'HEAD'].includes(method.toUpperCase())) {
    return fetch(url.toString(), { method });
  }
  const body = data instanceof FormData ? data : JSON.stringify(data);
  return fetch(url.toString(), { method, body });
}

export interface FormActionAndMethod { url: URL, action: string, method: string }
export function getFormActionAndMethod(form: HTMLFormElement): FormActionAndMethod {
  const action = form.getAttribute('action') || '';
  const method = form.getAttribute('method') || 'GET';
  const url = new URL(action, getAPIURL())
  return { url, action, method }
}