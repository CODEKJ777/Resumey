"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Trash2 } from "lucide-react"

interface Education {
  id: string
  school: string
  degree: string
  field: string
  startYear: string
  endYear: string
}

interface EducationSectionProps {
  value: Education[]
  onChange: (education: Education[]) => void
}

export function EducationSection({
  value,
  onChange,
}: EducationSectionProps) {
  const [editingId, setEditingId] = useState<string | null>(null)

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      school: "",
      degree: "",
      field: "",
      startYear: "",
      endYear: "",
    }
    onChange([...value, newEducation])
    setEditingId(newEducation.id)
  }

  const updateEducation = (id: string, updates: Partial<Education>) => {
    onChange(
      value.map((edu) => (edu.id === id ? { ...edu, ...updates } : edu))
    )
  }

  const removeEducation = (id: string) => {
    onChange(value.filter((edu) => edu.id !== id))
  }

  return (
    <div className="space-y-4">
      {value.map((edu) => (
        <Card key={edu.id} className="p-4">
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-muted-foreground">School</Label>
                <Input
                  placeholder="School name"
                  value={edu.school}
                  onChange={(e) =>
                    updateEducation(edu.id, { school: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Degree</Label>
                <Input
                  placeholder="e.g., Bachelor's, Master's"
                  value={edu.degree}
                  onChange={(e) =>
                    updateEducation(edu.id, { degree: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-muted-foreground">Field of Study</Label>
                <Input
                  placeholder="e.g., Computer Science"
                  value={edu.field}
                  onChange={(e) =>
                    updateEducation(edu.id, { field: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Graduation Year</Label>
                <Input
                  type="number"
                  placeholder="2024"
                  value={edu.endYear}
                  onChange={(e) =>
                    updateEducation(edu.id, { endYear: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeEducation(edu.id)}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
      <Button onClick={addEducation} variant="outline" className="w-full">
        Add Education
      </Button>
    </div>
  )
}
