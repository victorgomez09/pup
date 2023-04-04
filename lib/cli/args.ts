/**
 * Exports helper functions to parse and check arguments of Pup Cli program
 *
 * @file      lib/cli/args.ts
 * @license   MIT
 */

import { Args, parse } from "../../deps.ts"

/**
 * Parses command line arguments and returns a parsed object.
 *
 * @param args - An array of command line arguments.
 * @returns - A parsed object containing the command line arguments.
 */
function parseArguments(args: string[]): Args {
  // All boolean arguments
  const booleanArgs = [
    "version",
    "help",
    "init",
    "append",
    "autostart",
    "remove",
    "status",
    "no-config",
    "terminate",
  ]

  // All string arguments
  const stringArgs = [
    "config",
    "watch",
    "cmd",
    "cwd",
    "id",
    "cron",

    "restart",
    "start",
    "stop",
    "block",
    "unblock",

    "upgrade",
  ]

  // And a list of aliases
  const alias = {
    "version": "v",
    "help": "h",
    "init": "i",
    "id": "I",
    "append": "a",
    "autostart": "A",
    "remove": "r",
    "status": "s",
    "no-config": "n",
    "config": "c",
    "cmd": "C",
    "watch": "w",
    "cron": "O",
    "cwd": "W",
  }

  return parse(args, { alias, boolean: booleanArgs, string: stringArgs, stopEarly: true, "--": true })
}

/**
 * Checks the parsed arguments and throws an error if any of the arguments are invalid.
 * @param args - The parsed arguments.
 * @returns - The parsed and checked arguments.
 * @throws - An error if any of the arguments are invalid.
 */
function checkArguments(args: Args): Args {
  // Check if the base argument is undefined or valid
  const baseArgument = args._.length > 0 ? args._[0] : undefined
  const validBaseArguments = ["init", "append", "remove", "status", "terminate", "start", "stop", "restart", "block", "unblock"]
  if (baseArgument !== undefined && typeof baseArgument === "string" && validBaseArguments.includes(baseArgument)) {
    throw new Error(`Invalid base argument: ${baseArgument}`)
  }

  // if --cmd or -- is used, then we don't use the config file
  const hasCmd = args["--"] || args.cmd

  const configOptions = baseArgument === "init" || baseArgument === "append"

  if (args["--"] && args.cmd) {
    throw new Error("'--cmd' and '--' cannot be used at the same time.")
  }

  // Do not allow configuration creation options without init and vice versa
  if (args.autostart && !configOptions) {
    throw new Error("Argument '--autostart' requires 'init' or 'append'")
  }
  if (args.cron && !configOptions) {
    throw new Error("Argument '--cron' requires 'init', 'append'")
  }
  if (args.watch && !configOptions) {
    throw new Error("Argument '--watch' requires 'init', 'append'")
  }
  if (hasCmd && !configOptions) {
    throw new Error("Argument '--cmd' requires 'init', 'append'")
  }
  if (!hasCmd && configOptions) {
    throw new Error("Arguments 'init' and 'append'")
  }
  if (!args.id && (args.init || args.append || args.remove)) {
    throw new Error("Arguments 'init', 'append', and 'remove' require '--id'")
  }

  return args
}

export { checkArguments, parseArguments }
