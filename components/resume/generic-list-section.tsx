"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { IconX, IconPlus } from "@tabler/icons-react"

interface ListItem {
  id: string
  [key: string]: string
}

interface GenericListSectionProps {
  value: ListItem[]
  onChange: (items: ListItem[]) => void
  fields: Array<{
    name: string
    label: string
    type?: "text" | "textarea"
    placeholder?: string
    required?: boolean
  }>
  title?: string
}

export function GenericListSection({
  value,
  onChange,
  fields,
  title = "Items",
}: GenericListSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const addItem = () => {
    const newItem: ListItem = {
      id: Date.now().toString(),
      ...Object.fromEntries(fields.map((f) => [f.name, ""])),
    }
    onChange([...value, newItem])
    setExpandedId(newItem.id)
  }

  const removeItem = (id: string) => {
    onChange(value.filter((item) => item.id !== id))
  }

  const updateItem = (id: string, fieldName: string, fieldValue: string) => {
    onChange(
      value.map((item) =>
        item.id === id ? { ...item, [fieldName]: fieldValue } : item
      )
    )
  }

  return (
    <div className="space-y-4">
      {value.map((item) => (
        <Card key={item.id} className="p-4">
          <button
            type="button"
            onClick={() =>
              setExpandedId(expandedId === item.id ? null : item.id)
            }
            className="w-full text-left flex justify-between items-center hover:opacity-70"
          >
            <div className="font-medium">
              {fields
                .slice(0, 2)
                .map((f) => item[f.name])
                .filter(Boolean)
                .join(" - ") || "New item"}
            </div>
            <span className="text-sm text-muted-foreground">
              {expandedId === item.id ? "−" : "+"}
            </span>
          </button>

          {expandedId === item.id && (
            <div className="mt-4 space-y-3 border-t pt-4">
              {fields.map((field) => (
                <div key={field.name}>
                  <Label htmlFor={`${item.id}-${field.name}`}>
                    {field.label}
                  </Label>
                  {field.type === "textarea" ? (
                    <Textarea
                      id={`${item.id}-${field.name}`}
                      placeholder={field.placeholder}
                      value={item[field.name] || ""}
                      onChange={(e) =>
                        updateItem(item.id, field.name, e.target.value)
                      }
                      className="min-h-20"
                    />
                  ) : (
                    <Input
                      id={`${item.id}-${field.name}`}
                      placeholder={field.placeholder}
                      value={item[field.name] || ""}
                      onChange={(e) =>
                        updateItem(item.id, field.name, e.target.value)
                      }
                    />
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeItem(item.id)}
                className="w-full"
              >
                <IconX className="w-4 h-4 mr-2" />
                Remove
              </Button>
            </div>
          )}
        </Card>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={addItem}
        className="w-full"
      >
        <IconPlus className="w-4 h-4 mr-2" />
        Add {title}
      </Button>
    </div>
  )
}
