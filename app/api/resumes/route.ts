import { NextRequest, NextResponse } from "next/server"

// Local storage simulation using a simple file-based approach
// For a class project, we'll use a simple JSON file stored in the project
import { writeFileSync, readFileSync, existsSync } from 'fs'
import { join } from 'path'

const STORAGE_FILE = join(process.cwd(), 'data', 'resumes.json')

// Ensure data directory exists
import { mkdirSync } from 'fs'
try {
  mkdirSync(join(process.cwd(), 'data'), { recursive: true })
} catch (error) {
  // Directory might already exist
}

// Helper functions to manage local storage
const getResumes = (): any[] => {
  try {
    if (existsSync(STORAGE_FILE)) {
      const data = readFileSync(STORAGE_FILE, 'utf-8')
      
      // Handle empty or invalid JSON
      if (!data || data.trim() === '') {
        return []
      }
      
      try {
        return JSON.parse(data)
      } catch (parseError) {
        console.error('JSON parse error, resetting file:', parseError)
        // Reset the file with empty array
        writeFileSync(STORAGE_FILE, '[]', 'utf-8')
        return []
      }
    }
    return []
  } catch (error) {
    console.error('Error reading resumes:', error)
    return []
  }
}

const saveResumes = (resumes: any[]) => {
  try {
    const jsonString = JSON.stringify(resumes, null, 2)
    writeFileSync(STORAGE_FILE, jsonString, 'utf-8')
  } catch (error) {
    console.error('Error saving resumes:', error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("POST request received:", body)
    
    const {
      id,
      title,
      domain,
      personalInfo,
      objective,
      skills,
      education,
      experience,
      certificates,
      internships,
      projects,
      presentations,
      achievements,
      extracurricular,
      languages,
    } = body

    let resumes = getResumes()
    
    const resumeData = {
      id: id || Date.now().toString(),
      title,
      domain,
      personal_info: personalInfo,
      objective,
      skills,
      education,
      experience,
      certificates,
      internships,
      projects,
      presentations,
      achievements,
      extracurricular,
      languages,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    if (id) {
      // Update existing resume
      const index = resumes.findIndex(r => r.id === id)
      if (index !== -1) {
        resumes[index] = { ...resumes[index], ...resumeData, updated_at: new Date().toISOString() }
        console.log("Updated resume:", resumes[index])
      }
    } else {
      // Add new resume
      resumes.push(resumeData)
      console.log("Added new resume:", resumeData)
    }

    saveResumes(resumes)
    console.log("All resumes after save:", resumes)
    return NextResponse.json(resumeData)
  } catch (error) {
    console.error("Error saving resume:", error)
    return NextResponse.json(
      { error: "Failed to save resume" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    
    let resumes = getResumes()
    console.log("GET request received. Current resumes:", resumes)

    if (id) {
      // Get single resume
      const resume = resumes.find(r => r.id === id)
      if (!resume) {
        return NextResponse.json({ error: "Resume not found" }, { status: 404 })
      }
      return NextResponse.json(resume)
    }

    // Return all resumes
    return NextResponse.json(resumes)
  } catch (error) {
    console.error("Error fetching resumes:", error)
    return NextResponse.json(
      { error: "Failed to fetch resumes" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Resume ID required" }, { status: 400 })
    }

    let resumes = getResumes()
    const index = resumes.findIndex(r => r.id === id)
    if (index === -1) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 })
    }

    resumes.splice(index, 1)
    saveResumes(resumes)
    console.log("Deleted resume. Remaining resumes:", resumes)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting resume:", error)
    return NextResponse.json(
      { error: "Failed to delete resume" },
      { status: 500 }
    )
  }
}
