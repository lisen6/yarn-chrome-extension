class Yarn {
  constructor() {
    this.packages = []
  }

  async add(packageName) {
    if (this.isURL(packageName)) {
      const urlParams = this.extractPackageInfo(packageName)
      const isInstalled = this.checkPackageIsInstalled(urlParams.packageName)
      if (isInstalled) return console.log(`${urlParams.packageName} 已安装.`)
      this.addYarn(urlParams)
      return
    }

    const isInstalled = this.checkPackageIsInstalled(packageName)
    if (isInstalled) return console.log(`${packageName} 已安装.`)

    try {
      const packageDetails = await this.cdnjs(packageName)
      this.addYarn(packageDetails)
      return
    } catch (error) {
      console.log(error, 123)
    }

    this.fail(pkgName)
  }

  isURL(url) {
    const urlRegex = /^https?:\/\//
    return urlRegex.test(url)
  }

  extractPackageInfo(url) {
    const [, packageName, version] =
      url.match(
        /https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/([a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*)\/(\d+\.\d+(?:\.\d+)?(?:-[a-zA-Z0-9]+)?)\/([a-zA-Z0-9-]+\.[a-zA-Z0-9]+)?/
      ) || []

    if (packageName && version) {
      return {
        packageName,
        version,
        cdn: 'cdnjs',
        src: url
      }
    } else {
      return null
    }
  }

  isPackageInstalled(packageName) {
    return this.checkPackageIsInstalled(packageName)
  }

  checkPackageIsInstalled(packageName) {
    return this.packages.some(({ packageName: name }) => name === packageName)
  }

  async cdnjs(packageName) {
    try {
      const url = `https://api.cdnjs.com/libraries/${packageName}`
      const response = await fetch(url)
      const res = await response.json()

      if (!res.error) {
        const { latest, version } = res
        return { src: latest, version, packageName, cdn: 'cdnjs' }
      }

      throw new Error()
    } catch (error) {
      throw new Error()
    }
  }

  // async jsdelivr(packageName) {
  //   const tempUrl = `https://cdn.jsdelivr.net/npm/${packageName}`
  //   const access = await fetch(tempUrl)
  //   console.log(access, 'access')
  //   if (access.ok) {
  //     return { src: tempUrl, packageName, cdn: 'jsdelivr' }
  //   }
  //   throw new Error('Failed to fetch package from jsdelivr.')
  // }

  async getNpmLibrariesByCdnUrl(keyword, limit = 10) {
    try {
      const params = new URLSearchParams({
        limit,
        search: keyword
      })
      const url = `https://api.cdnjs.com/libraries?${params.toString()}`
      const response = await fetch(url)
      const data = await response.json()
      if (!data.error) {
        return data
      }
      throw new Error()
    } catch (error) {
      throw new Error()
    }
  }

  fail(packageName) {
    console.log(`未找到 ${packageName} 包。请检查包名称。`)
  }

  addYarn(detail) {
    const { src, version = '', packageName, cdn } = detail

    console.time('安装时间：')
    console.log('请稍等，正在安装包...')

    const script = document.createElement('script')
    script.src = src
    script.onload = () => {
      const showPackageInfo = `cdn: ${cdn} - ${packageName}${
        version ? `@${version}` : ''
      } 安装成功。`

      console.log(`安装完成 ✅ ${showPackageInfo}`)
      console.timeEnd('安装时间：')

      this.packages.push(detail)
    }
    document.body.appendChild(script)
  }

  log() {
    const { packages } = this
    if (!packages.length) {
      console.log(`没有找到已安装的软件包.`)
      return
    }
    console.table(packages)
  }

  async search(keyword, limit = 10) {
    if (!keyword) {
      throw new Error('请输入关键字搜索相应的NPM库.')
    }

    console.log('正在查询...')

    const { results } = await this.getNpmLibrariesByCdnUrl(keyword, limit)

    if(!results.length) {
      return console.log(`未找到 ${keyword} 包.`)
    }

    results.forEach(({ name, latest }) => {
      console.log(
        `%c${name} - %c${latest}`,
        'color: #00bfff;',
        'color: #ff00ff;'
      )
    })
  }

  clear() {
    this.packages = []
    console.log(`Yarn 注册的所有包已清除`)
  }

  view(packageName) {

  }
}

const instance = new Yarn()
const yarn = function (packageName) {
  try {
    instance.add(packageName)
  } catch (error) {
    console.error(error)
  }
}
yarn.log = instance.log.bind(instance)
yarn.search = function (packageName) {
  try {
    instance.search(packageName)
  } catch (error) {
    console.error(error)
  }
}
