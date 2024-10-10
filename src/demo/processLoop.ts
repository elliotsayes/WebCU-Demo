import AoLoader, { Message } from "@permaweb/ao-loader";
import { fetchProcessInitial } from "../lib/process";

const command0 = `
-- Load the AO Physics library
AOP = require(".AOP")
return print("Loaded AO Physics library")
`;

const command1 = `
-- Define the number of simulation frames and the time step for each frame
local framesToSimulate = 1000
local deltaTime = 1.0 / 60.0

--- Create a World ---
-- Initialize a new world and create it
world = AOP:World()
world:Create()

--- Create a Floor ---
-- Create a static floor body with a large size to act as the ground
local floor = AOP:Body()
floor.shape = "Box" -- Shape of the body
floor.size = { 100.0, 1.0, 100.0 } -- Size of the box (length, width, height)
floor.motionType = "Static" -- The body does not move
floor.layer = "NON_MOVING" -- Layer for static objects
floor.activate = false -- Do not activate this body initially
floor:Add() -- Add the body to the world

-- Create a dynamic sphere body and set its initial linear velocity
local sphere = AOP:Body()
sphere.shape = "Sphere" -- Shape of the body
sphere.radius = 0.5 -- Radius of the sphere
sphere.position = { -3.0, 1, 0.0 } -- Initial position of the sphere (x, y, z)
sphere:Add() -- Add the body to the world
sphere:SetLinearVelocity({ 0.0, 0.0, 5.0 }) -- Set the initial linear velocity

-- Create another dynamic sphere body and apply a force
local sphere2 = AOP:Body()
sphere2.shape = "Sphere" -- Shape of the body
sphere2.radius = 0.5 -- Radius of the sphere
sphere2.position = { -1.0, 1, 0.0 } -- Initial position of the sphere
sphere2:Add() -- Add the body to the world
sphere2:AddForce({ 0.0, 0.0, 100000.0 }) -- Apply a force to the sphere

-- Create a third dynamic sphere body and apply an impulse
local sphere3 = AOP:Body()
sphere3.shape = "Sphere" -- Shape of the body
sphere3.radius = 0.5 -- Radius of the sphere
sphere3.position = { 1.0, 1, 0.0 } -- Initial position of the sphere
sphere3:Add() -- Add the body to the world
sphere3:AddImpulse({ 0.0, 0.0, 1500.0 }) -- Apply an impulse to the sphere

-- Create a fourth dynamic sphere body and apply torque
local sphere4 = AOP:Body()
sphere4.shape = "Sphere" -- Shape of the body
sphere4.radius = 0.5 -- Radius of the sphere
sphere4.position = { 3.0, 1, 0.0 } -- Initial position of the sphere
sphere4:Add() -- Add the body to the world
sphere4:AddTorque({ 50000.0, 0.0, 0 }) -- Apply torque to the sphere
`;

const command2toN = `
world:Update(1, deltaTime) -- Update the world with a single step
worldState = world:GetState() -- Get the current state of the world
`;

const commandN = `
--- Destroy the World ---
-- Clean up and destroy the world to free resources
world:Destroy()

-- Return
return worldState
`;

export async function processLoop(
  count: number,
  applyMessage: (message: Message) => Promise<AoLoader.HandleResponse>
) {
  let command = "X = (X or 0) + 1";
  // let memory = null;
  let lastOutput = null;
  for (let i = 0; i <= count; i++) {
    if (i === 0) command = command0;
    if (i === 1) command = command1;
    if (i === 2) command = command2toN;
    if (i === count) command = commandN;
    const result = await applyMessage({
      Id: `MESSAGE_ID_${i}`,
      "Block-Height": "0",
      Timestamp: "0",
      Cron: false,
      Owner: "FROM_ADDRESS",
      From: "FROM_ADDRESS",
      // Target: processData.processDef.id,
      Module: "MODULE_ADDRESS",
      Tags: [{ name: "Action", value: "Eval" }],
      Data: command,
    });
    // console.log(result);

    // memory = result.Memory;
    lastOutput = result.Output;

    // console.log("Memory size: ", result.Memory?.byteLength);

    // console.log({ input: command, output: result.Output });
  }

  return lastOutput;
}
