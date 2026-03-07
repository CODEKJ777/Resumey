"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IconX } from "@tabler/icons-react"

interface LanguagesInputProps {
  value: string[]
  onChange: (languages: string[]) => void
}

export function LanguagesInput({ value, onChange }: LanguagesInputProps) {
  const [inputValue, setInputValue] = useState("")

  const addLanguage = () => {
    if (inputValue.trim() && !value.includes(inputValue.trim())) {
      onChange([...value, inputValue.trim()])
      setInputValue("")
    }
  }

  const removeLanguage = (language: string) => {
    onChange(value.filter((l) => l !== language))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addLanguage()
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input
          placeholder="e.g., English, Spanish, Mandarin"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button type="button" onClick={addLanguage} variant="secondary">
          Add
        </Button>
      </div>

      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((language) => (
            <div
              key={language}
              className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full flex items-center gap-2 text-sm"
            >
              {language}
              <button
                type="button"
                onClick={() => removeLanguage(language)}
                className="hover:opacity-70"
              >
                <IconX className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
