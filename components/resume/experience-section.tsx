"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Trash2 } from "lucide-react"

interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
}

interface ExperienceSectionProps {
  value: Experience[]
  onChange: (experience: Experience[]) => void
}

export function ExperienceSection({
  value,
  onChange,
}: ExperienceSectionProps) {
  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    }
    onChange([...value, newExperience])
  }

  const updateExperience = (id: string, updates: Partial<Experience>) => {
    onChange(
      value.map((exp) => (exp.id === id ? { ...exp, ...updates } : exp))
    )
  }

  const removeExperience = (id: string) => {
    onChange(value.filter((exp) => exp.id !== id))
  }

  return (
    <div className="space-y-4">
      {value.map((exp) => (
        <Card key={exp.id} className="p-4">
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-muted-foreground">Company</Label>
                <Input
                  placeholder="Company name"
                  value={exp.company}
                  onChange={(e) =>
                    updateExperience(exp.id, { company: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Position</Label>
                <Input
                  placeholder="Job title"
                  value={exp.position}
                  onChange={(e) =>
                    updateExperience(exp.id, { position: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-muted-foreground">Start Date</Label>
                <Input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) =>
                    updateExperience(exp.id, { startDate: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">End Date</Label>
                <Input
                  type="month"
                  value={exp.endDate}
                  onChange={(e) =>
                    updateExperience(exp.id, { endDate: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Description</Label>
              <Textarea
                placeholder="Describe your responsibilities and achievements"
                value={exp.description}
                onChange={(e) =>
                  updateExperience(exp.id, { description: e.target.value })
                }
                className="mt-1 min-h-20"
              />
            </div>
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeExperience(exp.id)}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
      <Button onClick={addExperience} variant="outline" className="w-full">
        Add Experience
      </Button>
    </div>
  )
}
