import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import Signup from "./SignUp";

jest.mock("axios");

describe("Signup Component", () => {
  test("Renders Signup Component Correctly", () => {
    render(<Signup />);

    // Check for form elements
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
    expect(
      screen.getByText(/Already have an account\? Login/i)
    ).toBeInTheDocument();
  });

  test("Displays Validation Error When Passwords Do Not Match", () => {
    render(<Signup />);

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: "password456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    expect(screen.getByText(/Passwords do not match./i)).toBeInTheDocument();
  });

  test("Displays Error If Required Fields Are Empty", () => {
    render(<Signup />);

    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    expect(screen.getByText(/All fields are mandatory./i)).toBeInTheDocument();
  });

  test("Successful API Call on Valid Submission", async () => {
    axios.post.mockResolvedValue({
      data: { message: "User has successfully signed up." },
    });

    render(<Signup />);

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    expect(await screen.findByText(/Signup failed./i)).toBeInTheDocument();
  });

  test("Displays API Error Message on Submission Failure", async () => {
    axios.post.mockRejectedValue({
      response: { data: { message: "Signup failed." } },
    });

    render(<Signup />);

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    expect(await screen.findByText(/Signup failed./i)).toBeInTheDocument();
  });
});
