# Pup - Simple yet powerful Process Manager

Pup is a command-line tool that simplifies the management of processes. Pup can start, stop, restart, and keep processes alive, as well as schedule processes using a cron pattern. It does also manage
the logs of each process, gathering them into a single stdout or file, making it easy to monitor and analyze the output of your processes in one place.

Pup is centered around a single configuration file called `pup.json`. This file defines every aspect of the program(s) to run, how to run them, and how logging should be handled.

> **Note** Please note that Pup is currently in an early stage of development and may contain bugs or unexpected behavior. Use at your own risk.

## Installation

Pup can be installed using Deno with the following command:

`deno install -A -n pup https://deno.land/x/pup@0.0.1-dev.0`

The -A flag grants all permissions needed for Pup to work properly. In case of Deno subprocesses, you can specify individual permissions for each process with the usual command line flags.

> **Note** Before using Pup, you need to have Deno installed on your system. You can download and install Deno with a single command following the instructions provided on the official website:
> https://deno.land/#installation

## Usage

To start using Pup, you can simply run `pup` on the command line. This will use the default configuration file `pup.json` located in the current directory.

If you want to use a different configuration file, you can pass the `--config` flag followed by the filename:

`pup --config myconfig.json`

Once Pup is running, it will read the configuration file and start the processes defined in it. You can also use Pup as a library within a Deno program to manage child processes.

## Configuration

Pup is centered around a single configuration file called `pup.json`. This file defines every aspect of the program, such as the processes to manage, how to start them, and when to restart them.

Here's an example of a basic `pup.json` file:

```
{
  "processes": [
    {
      "name": "periodic-example-task",
      "cmd": ["deno", "run", "--allow-read", "./task2.js"],
      "startPattern": "*/5 * * * * *"
    },
    {
      "name": "server-task",
      "cmd": ["deno", "run", "--allow-read", "./task1.js"],
      "autostart": true,
      "restart": "always",
      "restartDelayMs": 10000
    }
  ]   
}
```

In this example, we define a single process called myapp. We specify the command to start the process using an array of strings. We also define a cron pattern to automatically restart the process
every day at midnight.

For more details on how to configure Pup, please refer to the official documentation.

## Example

A basic example with a main process and a scheduled task is available in [/examples/basic](/examples/basic)

**Running the example**

Change working dir to the example directory containg a couple of scripts and `pup.json`

```
cd /examples/basic
```

Start pup by running the command `pup`. If you have not yet installed pup, you can run it from this repository like this.

```
deno run -A ../../pup.ts
```

server.js will start instantly, and will restart automatically 10 seconds after exiting. task.js will start every tenth second according to cron pattern `*/10 * * * * *`

**Output**

![Pup example logs](/docs/pup-logs.png "Pup example logs")

## Contributions

Contributions to Pup are very welcome! Please read [CONTRIBUTING.md](/docs/CONTRIBUTING.md), fork the repository, make your changes, and submit a pull request. We appreciate all feedback and contributions that help make Pup better.
