package com.bezkoder.spring.jpa.postgresql.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bezkoder.spring.jpa.postgresql.model.Customer;
import com.bezkoder.spring.jpa.postgresql.repository.CustomerRepository;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class CustomerController {

	@Autowired
	CustomerRepository customerRepository;

	@GetMapping("/customers")
	public ResponseEntity<List<Customer>> getAllCustomers(@RequestParam(required = false) String title) {
		try {
			List<Customer> customers = new ArrayList<Customer>();

			if (title == null)
				customerRepository.findAll().forEach(customers::add);
			else
				customerRepository.findByTitleContaining(title).forEach(customers::add);

			if (customers.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(customers, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/customers/{id}")
	public ResponseEntity<Customer> getCustomerById(@PathVariable("id") long id) {
		Optional<Customer> customerData = customerRepository.findById(id);

		if (customerData.isPresent()) {
			return new ResponseEntity<>(customerData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/customers")
	public ResponseEntity<Customer> createCustomer(@RequestBody Customer customer) {
		try {
			Customer _customer = customerRepository
					.save(new Customer(customer.getTitle(), customer.getDescription(), customer.getPhoneNumber(),false));
			return new ResponseEntity<>(_customer, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/customers/{id}")
	public ResponseEntity<Customer> updateCustomer(@PathVariable("id") long id, @RequestBody Customer customer) {
		Optional<Customer> customerData = customerRepository.findById(id);

		if (customerData.isPresent()) {
			Customer _customer = customerData.get();
			_customer.setTitle(customer.getTitle());
			_customer.setDescription(customer.getDescription());
			_customer.setPhoneNumber(customer.getPhoneNumber());
			
			_customer.setPublished(customer.isPublished());
			return new ResponseEntity<>(customerRepository.save(_customer), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/customers/{id}")
	public ResponseEntity<HttpStatus> deleteCustomer(@PathVariable("id") long id) {
		try {
			customerRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/customers")
	public ResponseEntity<HttpStatus> deleteAllCustomers() {
		try {
			customerRepository.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@GetMapping("/customers/published")
	public ResponseEntity<List<Customer>> findByPublished() {
		try {
			List<Customer> customers = customerRepository.findByPublished(true);

			if (customers.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(customers, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
