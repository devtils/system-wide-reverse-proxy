export default class App {
  _appNode = null
  get appNode() { return this._appNode }

  constructor (appNode) {
    console.time('App.constructor')
    if (!(appNode instanceof HTMLElement)) throw new Error('node must be an HTMLElement')
    this._appNode = appNode
    this.appNode.appendChild(this.createPutForm())
    this.fetchProducts().then(products => this.updateList(products))
    console.timeEnd('App.constructor')
  }

  ///
  /// DOM Modifications
  ///

  createPutForm () {
    console.time('App.createPutForm')

    const formNode = document.createElement('form')
    formNode.classList.add('product-create-form')
    formNode.setAttribute('method', 'put')
    formNode.setAttribute('action', '/api/product')

    const nameLabelNode = document.createElement('label')
    const nameLabelTextNode = document.createElement('span')
    nameLabelTextNode.classList.add('label')
    nameLabelTextNode.textContent = 'Name:'
    nameLabelNode.appendChild(nameLabelTextNode)
    const nameInputNode = document.createElement('input')
    nameInputNode.setAttribute('type', 'text')
    nameInputNode.setAttribute('name', 'name')
    nameInputNode.setAttribute('placeholder', 'Name')
    nameLabelNode.appendChild(nameInputNode)
    formNode.appendChild(nameLabelNode)

    const priceLabelNode = document.createElement('label')
    const priceLabelTextNode = document.createElement('span')
    priceLabelTextNode.classList.add('label')
    priceLabelTextNode.textContent = 'Price:'
    priceLabelNode.appendChild(priceLabelTextNode)
    const priceInputNode = document.createElement('input')
    priceInputNode.setAttribute('type', 'number')
    priceInputNode.setAttribute('price', 'price')
    priceInputNode.setAttribute('placeholder', 'Price')
    priceInputNode.setAttribute('min', '0')
    priceInputNode.setAttribute('max', '1000')
    priceInputNode.setAttribute('step', '.1')
    priceLabelNode.appendChild(priceInputNode)
    formNode.appendChild(priceLabelNode)

    const submitButtonNode = document.createElement('button')
    submitButtonNode.setAttribute('type', 'submit')
    submitButtonNode.textContent = 'Create'
    formNode.addEventListener('submit', event => {
      event.preventDefault()
      const data = { name: nameInputNode.value, price: priceInputNode.valueAsNumber }
      this.putProduct(data).then(() => this.fetchProducts().then(products => this.updateList(products)))
    })
    formNode.appendChild(submitButtonNode)

    console.timeEnd('App.createPutForm')
    return formNode
  }

  updateList(products = []) {
    console.time('App.updateList')

    const listNode = this.appNode.querySelector('ul')
    if (listNode) this.appNode.removeChild(listNode)

    this.appNode.appendChild(this.createList(products))

    console.timeEnd('App.updateList')
  }

  createList(products = []) {
    console.time('App.createList')

    const listNode = document.createElement('ul')
    listNode.classList.add('product-list')
    products.forEach(product => {
      const itemNode = document.createElement('li')
      itemNode.classList.add('product')
      itemNode.appendChild(this.createUpdateForm(product))

      listNode.appendChild(itemNode)
    })

    console.timeEnd('App.createList')
    return listNode
  }

  createUpdateForm (product) {
    console.time('App.createUpdateForm')

    const formNode = document.createElement('form')
    formNode.classList.add('product-update-form')
    formNode.setAttribute('method', 'patch')
    formNode.setAttribute('action', `/api/product/${product.id}`)
    formNode.setAttribute('data-product-id', product.id.toString())

    const nameLabelNode = document.createElement('label')
    const nameLabelTextNode = document.createElement('span')
    nameLabelTextNode.classList.add('label')
    nameLabelTextNode.textContent = 'Name:'
    nameLabelNode.appendChild(nameLabelTextNode)
    const nameInputNode = document.createElement('input')
    nameInputNode.setAttribute('type', 'text')
    nameInputNode.setAttribute('name', 'name')
    nameInputNode.setAttribute('placeholder', 'Name')
    nameInputNode.value = product.name
    nameLabelNode.appendChild(nameInputNode)
    formNode.appendChild(nameLabelNode)

    const priceLabelNode = document.createElement('label')
    const priceLabelTextNode = document.createElement('span')
    priceLabelTextNode.classList.add('label')
    priceLabelTextNode.textContent = 'Price:'
    priceLabelNode.appendChild(priceLabelTextNode)
    const priceInputNode = document.createElement('input')
    priceInputNode.setAttribute('type', 'number')
    priceInputNode.setAttribute('price', 'price')
    priceInputNode.setAttribute('placeholder', 'Price')
    priceInputNode.setAttribute('min', '0')
    priceInputNode.setAttribute('max', '1000')
    priceInputNode.setAttribute('step', '.1')
    priceInputNode.valueAsNumber = product.price
    priceLabelNode.appendChild(priceInputNode)
    formNode.appendChild(priceLabelNode)

    const submitButtonNode = document.createElement('button')
    submitButtonNode.setAttribute('type', 'submit')
    submitButtonNode.textContent = 'Update'
    formNode.addEventListener('submit', event => {
      event.preventDefault()
      const data = { name: nameInputNode.value, price: priceInputNode.valueAsNumber }
      this.patchProduct(product.id, data).then(() => this.fetchProducts().then(products => this.updateList(products)))
    })
    formNode.appendChild(submitButtonNode)

    const deleteButtonNode = document.createElement('button')
    deleteButtonNode.setAttribute('type', 'button')
    deleteButtonNode.textContent = 'x'
    deleteButtonNode.addEventListener('click', () => {
      if (confirm(`Do you really want to delete Product #${product.id}?`)) {
        this.deleteProduct(product.id).then(() => this.fetchProducts().then(products => this.updateList(products)))
      }
    }, false)
    formNode.appendChild(deleteButtonNode)

    console.timeEnd('App.createUpdateForm')
    return formNode
  }

  ///
  /// Product API
  ///

  async fetchProducts () {
    console.time('App.fetchProducts')
    const url = new URL('/api/products', window.location.origin)
    const resp = await fetch(url.toString(), { method: 'GET' })
    const respData = resp.status === 200 ? resp.json() : null
    console.timeEnd('App.fetchProducts')
    return respData
  }

  async fetchProduct(id) {
    console.time('App.fetchProduct')
    if (typeof id !== 'number' || id <= 0) return null
    const url = new URL(`/api/product/${id}`, window.location.origin)
    const resp = await fetch(url.toString(), { method: 'GET' })
    const respData = resp.status === 200 ? resp.json() : null
    console.timeEnd('App.fetchProduct')
    return respData
  }

  async putProduct(data) {
    console.time('App.putProduct')
    if (typeof data !== 'object' || data === null) return null
    // TODO validate data
    const body = JSON.stringify(data)
    const headers = { 'Content-Type': 'application/json' }
    const url = new URL('/api/product', window.location.origin)
    const resp = await fetch(url.toString(), { method: 'PUT', headers, body })
    const respData = resp.status === 201 ? resp.json() : null
    console.timeEnd('App.putProduct')
    return respData
  }

  async patchProduct(id, data) {
    console.time('App.patchProduct')
    if (typeof id !== 'number' || id <= 0) return null
    if (typeof data !== 'object' || data === null) return null
    // TODO validate data
    const body = JSON.stringify(data)
    const headers = { 'Content-Type': 'application/json' }
    const url = new URL(`/api/product/${id}`, window.location.origin)
    const resp = await fetch(url.toString(), { method: 'PATCH', headers, body })
    const respData = resp.status === 200 ? resp.json() : null
    console.timeEnd('App.patchProduct')
    return respData
  }

  async deleteProduct(id) {
    console.time('App.deleteProduct')
    if (typeof id !== 'number' || id <= 0) return null
    const url = new URL(`/api/product/${id}`, window.location.origin)
    const resp = await fetch(url.toString(), { method: 'DELETE' })
    console.timeEnd('App.deleteProduct')
    return resp.status === 200
  }
}
