class Yarn {
  constructor() {
    this.packages = []
    this.registerCDN = [this.cdnjs, this.jsdelivr]
  }

  async add(packageName) {
    if (this.checkPackageIsInstalled(packageName)) {
      console.log(`${packageName} is already installed.`)
      return
    }

    for (let i = 0; i < this.registerCDN.length; i++) {
      try {
        const packageDetails = await this.registerCDN[i](packageName)
        this.addYarn(packageDetails)
        return
      } catch (error) {
        console.log(error)
      }
    }

    this.fail(packageName)
  }

  checkPackageIsInstalled(packageName) {
    return this.packages.some((v) => v.packageName === packageName)
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

  async jsdelivr(packageName) {
    const tempUrl = `https://cdn.jsdelivr.net/npm/${packageName}`
    const access = await fetch(tempUrl)
    if (access.ok) {
      return { src: tempUrl, packageName, cdn: 'jsdelivr' }
    }
    throw new Error('Failed to fetch package from jsdelivr.')
  }

  fail(packageName) {
    const numWays = this.registerCDN.length
    console.log(
      `使用 ${numWays} 种方法加载，但未找到 ${packageName} 包。请检查包名称。`
    )
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

  console() {
    if (!this.packages.length) {
      console.log('No packages found.')
      return
    }
    console.table(this.packages)
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
yarn.console = instance.console.bind(instance)
