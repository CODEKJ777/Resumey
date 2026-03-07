"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SkillsInputProps {
  value: string[]
  onChange: (skills: string[]) => void
}

export function SkillsInput({ value, onChange }: SkillsInputProps) {
  const [inputValue, setInputValue] = useState("")

  const addSkill = () => {
    const skill = inputValue.trim()
    if (skill && !value.includes(skill)) {
      onChange([...value, skill])
      setInputValue("")
    }
  }

  const removeSkill = (skill: string) => {
    onChange(value.filter((s) => s !== skill))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill()
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          placeholder="Add a skill and press Enter"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={addSkill} variant="outline">
          Add
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {value.map((skill) => (
          <div
            key={skill}
            className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
          >
            <span>{skill}</span>
            <button
              onClick={() => removeSkill(skill)}
              className="ml-1 hover:text-primary/80"
            >
              <X className="size-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
