import React from "react";
import {
  Form,
  Input,
  Select,
  SelectItem,
  Checkbox,
  Button,
} from "@heroui/react";
import { FormDatas, FormErrors } from "@/src/types/form";

export default function ProductForm({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = React.useState<string>("");
  const [submitted, setSubmitted] = React.useState<FormDatas | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // const getPasswordError = (value: string): string | null => {
  //   if (value.length < 4) return "Password must be 4 characters or more";
  //   if ((value.match(/[A-Z]/g) || []).length < 1)
  //     return "Password needs at least 1 uppercase letter";
  //   if ((value.match(/[^a-z]/gi) || []).length < 1)
  //     return "Password needs at least 1 symbol";
  //   return null;
  // };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));

    if (!name || !price) {
      setError("Name and price are required");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price }),
      });

      if (!res.ok) throw new Error("Failed to create product");

      const data = await res.json();
      setSubmitted(data); // ✅ show submitted product
      // e.currentTarget.reset();
      onSuccess(); // ✅ refresh product list
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      className="w-full justify-center items-center space-y-4"
      // validationErrors={errors}
      onReset={() => setSubmitted(null)}
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-4 max-w-md">
        <Input
          // isRequired
          // errorMessage={({ validationDetails }) => {
          //   if (validationDetails.valueMissing) {
          //     return "Please enter your name";
          //   }

          //   return errors.name;
          // }}
          label="Name"
          labelPlacement="outside"
          name="name"
          placeholder="Enter your name"
        />

        <Input
          className="mb-4"
          // isRequired
          // errorMessage={({ validationDetails }) => {
          //   if (validationDetails.valueMissing) {
          //     return "Please enter your email";
          //   }
          //   if (validationDetails.typeMismatch) {
          //     return "Please enter a valid email address";
          //   }
          // }}
          label="Price"
          labelPlacement="outside"
          name="price"
          placeholder="Enter price"
          // type="email"
        />

        {/* <Input
          isRequired
          errorMessage={getPasswordError(password)}
          isInvalid={getPasswordError(password) !== null}
          label="Password"
          labelPlacement="outside"
          name="password"
          placeholder="Enter your password"
          type="password"
          value={password}
          onValueChange={setPassword}
        /> */}

        {/* <Select
          isRequired
          label="Country"
          labelPlacement="outside"
          name="country"
          placeholder="Select country"
        >
          <SelectItem key="ar">Argentina</SelectItem>
          <SelectItem key="us">United States</SelectItem>
          <SelectItem key="ca">Canada</SelectItem>
          <SelectItem key="uk">United Kingdom</SelectItem>
          <SelectItem key="au">Australia</SelectItem>
        </Select> */}

        {/* <Checkbox
          isRequired
          classNames={{
            label: "text-small",
          }}
          isInvalid={!!errors.terms}
          name="terms"
          validationBehavior="aria"
          value="true"
          onValueChange={() =>
            setErrors((prev: FormErrors) => ({ ...prev, terms: undefined }))
          }
        >
          I agree to the terms and conditions
        </Checkbox> */}

        {/* {errors.terms && (
          <span className="text-danger text-small">{errors.terms}</span>
        )} */}

        <div className="flex gap-4">
          <Button className="w-full" color="primary" type="submit">
            Submit
          </Button>
          <Button type="reset" variant="bordered">
            Reset
          </Button>
        </div>
      </div>

      {submitted && (
        <div className="text-small text-default-500 mt-4">
          Submitted data: <pre>{JSON.stringify(submitted, null, 2)}</pre>
        </div>
      )}
    </Form>
  );
}
