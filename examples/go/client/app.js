export default class App {
  constructor (appNode) {
    const p = document.createElement('p')
    p.classList.add('colorized')
    p.textContent = 'This text was added by app.js ... Fetching products in 1 sec'
    appNode.appendChild(p)

    window.setTimeout(async () => {
      const pre = document.createElement('pre')
      pre.textContent = JSON.stringify(await this.fetchProducts(), null, 2)
      appNode.appendChild(pre)
    }, 1000)
  }
  
  async fetchProducts () {
    const url = new URL('/api/products', window.location.origin)
    return fetch(url.toString(), { method: 'GET' }).then(resp => resp.json())
  }
}
