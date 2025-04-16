export async function userRegister(formData, BASE_URL) {
  const payload = {
    name: formData.username,
    email: formData.email,
    password: formData.password,
    bio: formData.bio,
    venueManager: formData.venueManager === "Yes",
  };

  if (formData.avatar.trim()) {
    payload.avatar = {
      url: formData.avatar.trim(),
      alt: `${formData.username}'s avatar`,
    };
  }

  if (formData.banner.trim()) {
    payload.banner = {
      url: formData.banner.trim(),
      alt: `${formData.username}'s banner`,
    };
  }

  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMessage =
      data.errors?.[0]?.path?.join(".") + ": " + data.errors?.[0]?.message ||
      "Registration failed";
    throw new Error(errorMessage);
  }

  return data;
}
