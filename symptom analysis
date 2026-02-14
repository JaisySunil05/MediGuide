import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
    try {
        const { symptoms, age } = await req.json();

        if (!symptoms || !age) {
            return NextResponse.json(
                { error: "Symptoms and age are required" },
                { status: 400 }
            );
        }

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: "Gemini API key not configured" },
                { status: 500 }
            );
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `You are a medical triage assistant. A patient (age ${age}) reports these symptoms: "${symptoms}"

Based on these symptoms, determine:
1. The most appropriate medical department they should visit
2. A Google Maps search keyword to find relevant hospitals/clinics (e.g. "cardiology hospital", "orthopedic clinic")
3. A brief one-line advice for the patient

Respond ONLY with valid JSON in this exact format, no markdown, no code blocks:
{"department": "Department Name", "keywords": "search keywords", "advice": "Brief advice"}

Common departments: Cardiology, Neurology, Orthopedics, Pulmonology, Gastroenterology, Dermatology, ENT, Ophthalmology, Urology, Gynecology, Pediatrics, Psychiatry, General Medicine, Emergency Medicine, Oncology`;

        const result = await model.generateContent(prompt);
        const text = result.response.text().trim();

        // Try to parse from possible markdown code blocks
        let jsonStr = text;
        const match = text.match(/```(?:json)?\s*([\s\S]*?)```/);
        if (match) {
            jsonStr = match[1].trim();
        }

        const parsed = JSON.parse(jsonStr);

        return NextResponse.json({
            department: parsed.department || "General Medicine",
            keywords: parsed.keywords || "hospital",
            advice: parsed.advice || "Please consult a doctor for proper diagnosis.",
        });
    } catch (error: unknown) {
        console.error("Gemini API error:", error);

        // Fallback response
        return NextResponse.json({
            department: "General Medicine",
            keywords: "hospital",
            advice: "We couldn't analyze your symptoms. Please visit a general physician.",
        });
    }
}
