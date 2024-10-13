print("[CodeRevealer] Mod loaded\n")

local lastLoggedCode = ""

RegisterHook("/Script/Starbreeze.SBZCodeViewerInterface:UpdateCodeViewer", function(self, generatedCodes, trueCodeIndex)
  -- Format the current code as a four-digit string
  local currentCode = string.format("%04d", generatedCodes:get()[trueCodeIndex:get() + 1])

  -- Check if the current code is different from the last logged code
  if currentCode ~= lastLoggedCode then
    print("\n[CodeRevealer] DOOR/VAULT CODE: " .. currentCode .. "\n\n")

    lastLoggedCode = currentCode
  end
end)
