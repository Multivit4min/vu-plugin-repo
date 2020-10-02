import yaml from "yaml"
import { promises as fs } from "fs"
import Joi from "joi"

const schema = Joi.object({
  plugins: Joi.array().items(Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    version: Joi.string().regex(/^\d+\.\d+\.\d+$/).required(),
    repository: Joi.string().required(),
    commit: Joi.string().required()
  })).required()
})

fs.readFile("./repository.yaml", "utf-8")
  .then(data => yaml.parse(data))
  .then(data => schema.validateAsync(data))
  .then(data => console.log(data))
  .catch(e => {
    console.error(e)
    process.exit(1)
  })