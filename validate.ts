import yaml from "yaml"
import { promises as fs } from "fs"
import Joi from "joi"
import fetch from "node-fetch"

declare interface Configuration {
  plugins: {
    name: string
    description: string
    version: string
    repository: string
    commit: string
  }[]
}

const schema = Joi.object({
  plugins: Joi.array().items(Joi.object({
    name: Joi.string().regex(/^[\w\d]+$/).required(),
    description: Joi.string().required(),
    version: Joi.string().regex(/^\d+\.\d+\.\d+$/).required(),
    repository: Joi.string().required(),
    commit: Joi.string().required()
  })).required()
})

fs.readFile("./repository.yaml", "utf-8")
  .then(data => yaml.parse(data))
  .then(data => schema.validateAsync(data))
  .then(({ plugins }: Configuration) => {
    return Promise.all(plugins.map(async plugin => {
      const url = `${plugin.repository}/archive/${plugin.commit}.zip`
      console.log(`fetching HEAD "${url}" ...`)
      const res = await fetch(url, { method: "HEAD" })
      if (res.status === 200) return
      throw new Error(`received non 200 status code for plugin "${plugin.name}" (${res.status})`)
    }))
  })
  .then(() => console.log("validation passed"))
  .catch(e => {
    console.error(e)
    process.exit(1)
  })